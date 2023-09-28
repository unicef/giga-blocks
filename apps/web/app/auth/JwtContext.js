"use client"

import React, {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
  } from 'react';
  import { useRouter } from 'next/navigation';
  
  import {
    isValidToken,
    saveAccessToken,
    getAccessToken,
    deleteAccessToken,
    saveCurrentUser,
    saveKey,
    getCurrentUser,
    clearStorage,
  } from '../utils/sessionManager';
  
  // ----------------------------------------------------------------------

  const ROLES = {
    SUPERADMIN: 'ADMIN',
    USER: 'USER',
  };

  const ROOTS_AUTH = '/auth'

  function path(root, sublink) {
    return `${root}${sublink}`;
  }

  const DEBUG_MODE = process.env.NEXT_PUBLIC_DEBUG_MODE === 'true' || false;

   const PATH_AUTH = {
    root: ROOTS_AUTH,
    login: path(ROOTS_AUTH, '/login'),
    register: path(ROOTS_AUTH, '/register'),
    verify: path(ROOTS_AUTH, '/verify'),
  };
  
  const initialState = {
    isDebug: DEBUG_MODE,
    isAuthenticated: false,
    isInitialized: false,
    token: null,
    user: null,
    roles: {
      isSuperAdmin: false,
      isUser: false,
    },
    addToken: () => {},
    deleteToken: () => {},
    addUser: () => {},
    addKey: () => {},
    logout: () => {},
  };
  
  const AppAuthContext = createContext({
    ...initialState,
    method: 'jwt',
  });
  
  function AuthProvider({ children }) {
    const [authState, setAuthState] = useState(initialState);
    const { push, replace } = useRouter();
    useEffect(() => {
      const initialize = async () => {
        try {
          const localToken = getAccessToken();
          if (localToken && isValidToken(localToken)) {
            const localUser = getCurrentUser();
            // const appSettings = await getAppSettings();
            setAuthState((prev) => ({
              ...prev,
              isAuthenticated: true,
              isInitialized: true,
              token: localToken,
              user: localUser,
            }));
          } else {
            setAuthState((prev) => ({
              ...prev,
              isAuthenticated: false,
              isInitialized: true,
            }));
          }
        } catch (err) {
          console.error(err);
        }
      };
  
      initialize();
    }, [push]);
  
    const addToken = (payload) => {
      if (payload) {
        setAuthState((prev) => ({ ...prev, token: payload }));
        saveAccessToken(payload);
      }
    };
  
    const addKey = (payload) => {
      if (payload) {
        setAuthState((prev) => ({ ...prev, keyData: payload }));
        saveKey(payload);
      }
    };
  
    const addUser = (user) => {
      setAuthState((prev) => ({ ...prev, user }));
      saveCurrentUser(user);
    };
  
    const deleteToken = () => {
      deleteAccessToken();
      setAuthState((prev) => ({ ...prev, isInitialized: true, token: '' }));
    };
  
    const logout = useCallback(async () => {
      clearStorage();
      setTimeout(() => {
        replace(PATH_AUTH.login);
      }, 1000);
    }, [replace]);
  
    const roles = useMemo(
      () => ({
        isSuperAdmin: authState.user?.roles?.includes(ROLES.SUPERADMIN) || false,
        isUser: authState.user?.roles?.includes(ROLES.USER) || false,
      }),
      [authState.user]
    );
  
    const contextProps = useMemo(
      () => ({
        ...authState,
        deleteToken,
        addToken,
        addUser,
        addKey,
        logout,
        roles,
        method: 'jwt',
      }),
      [authState, roles, logout]
    );
  
    return <AppAuthContext.Provider value={contextProps}>{children}</AppAuthContext.Provider>;
  }
  
  export { AppAuthContext, AuthProvider };
  
  export const useAppAuthContext = () => useContext(AppAuthContext);
  