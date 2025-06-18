'use client';
import { useState, useEffect, useMemo, useCallback } from 'react';

export const hashStorage = {
  getItem: (key) => {
    const searchParams = new URLSearchParams(window.location.hash.slice(1));
    const storedValue = searchParams.get(key);
    return storedValue ? JSON.parse(storedValue) : null;
  },
  setItem: (key, newValue) => {
    const searchParams = new URLSearchParams(window.location.hash.slice(1));
    searchParams.set(key, JSON.stringify(newValue));
    window.location.hash = searchParams.toString();
  },
  removeItem: (key) => {
    const searchParams = new URLSearchParams(window.location.hash.slice(1));
    searchParams.delete(key);
    window.location.hash = searchParams.toString();
  },
};

export const useResetFilters = () => {
  const [filters, setFilters] = useState(hashStorage.getItem('filters') || {});

  useEffect(() => {
    const storedFilters = hashStorage.getItem('filters');
    if (JSON.stringify(storedFilters) !== JSON.stringify(filters)) {
      if (Object.keys(filters).length > 0) {
        hashStorage.setItem('filters', filters);
      } else {
        // Clean up the hash completely when filters is empty
        window.location.hash = '';
      }
    }
  }, [filters]);

  const resetFilters = useCallback(() => {
    setFilters({});
    // Remove hash entirely when resetting filters
    window.location.hash = '';
  }, []);

  return {
    filters,
    setFilters,
    resetFilters,
  };
};
