import { AdministrationService } from '@services/index';
import { createContext, useCallback, useContext, useState, useMemo, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { IUserAccountGeneral } from 'src/@types/user';

interface Pagination {
  start: number;
  limit: number;
  count: number;
  totalPage?: number;
}
interface AdministrationState {
  users: IUserAccountGeneral[];
  usersName: { label: string; value: number }[];
  singleUser: IUserAccountGeneral | {};
  refresh: boolean;
  filteredUsers: { data: IUserAccountGeneral[] };
  error: Record<string, any>;
  pagination: Pagination;
}

interface AdministrationProviderProps {
  children: ReactNode;
}

interface AdministrationContextValue extends AdministrationState {
  getFilteredUsers: (query: string) => Promise<IUserAccountGeneral[]>;
}

const initialState: AdministrationContextValue = {
  users: [],
  usersName: [],
  singleUser: {},
  refresh: false,
  filteredUsers: {},
  error: {},
  pagination: {
    start: 0,
    limit: 10,
    count: 0,
  },
  getFilteredUsers: (query: string) => Promise<IUserAccountGeneral>,
};

const AdministrationContext = createContext(initialState);

export const AdministrationProvider = ({ children }: AdministrationProviderProps) => {
  const [state, setState] = useState(initialState);

  const getFilteredUsers = useCallback(async (query: string) => {
    const response = await AdministrationService.filterUsersList(query);

    const formatted: IUserAccountGeneral[] = response?.data?.users.map((item) => ({
      ...item,
      id: item?.id,
      email: item?.email?.toLowerCase(),
      is_active: item?.isActive,
      isBlocked: item?.isBlocked,
      isApproved: item?.isApproved,
    }));

    setState((prevState) => ({
      ...prevState,
      filteredUsers: {
        data: formatted,
      },
    }));
    return formatted;
  }, []);

  const getUserById = useCallback(async (id: string) => {
    const response = await AdministrationService.getUserById(id);
    const formatted = {
      ...response.data,
    };

    setState((prev) => ({
      ...prev,
      singleUser: formatted,
    }));
    return formatted;
  }, []);

  const contextValue: AdministrationContextValue = useMemo(
    () => ({
      ...state,
      getUserById,
      getFilteredUsers,
    }),
    [state, getUserById, getFilteredUsers]
  );

  return (
    <AdministrationContext.Provider value={contextValue}>{children}</AdministrationContext.Provider>
  );
};

AdministrationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAdministrationContext = () => {
  const context = useContext(AdministrationContext);
  if (!context) {
    throw new Error('useAdministrationContext must be used within an AdministrationProvider');
  }
  return context;
};
