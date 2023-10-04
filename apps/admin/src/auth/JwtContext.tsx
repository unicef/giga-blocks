import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useRouter } from 'next/router';

import { PATH_AUTH } from '@routes/paths';

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
import { ROLES, DEBUG_MODE } from '../config-global';
import { AuthState, ExtendedAuthState } from './types';
import { metaMask } from '@components/web3/connectors/metaMask';
import { useAuthContext } from './useAuthContext';

// ----------------------------------------------------------------------

const initialState: AuthState = {
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

const AppAuthContext = createContext<ExtendedAuthState>({
  ...initialState,
  method: 'jwt',
});

// ----------------------------------------------------------------------

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [authState, setAuthState] = useState<AuthState>(initialState);
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

  const addToken = (payload: string) => {
    if (payload) {
      setAuthState((prev) => ({ ...prev, token: payload }));
      saveAccessToken(payload);
    }
  };

  const addKey = (payload: any) => {
    if (payload) {
      setAuthState((prev) => ({ ...prev, keyData: payload }));
      saveKey(payload);
    }
  };

  const addUser = (user: any) => {
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

  useEffect(()=>{
   const walletState=  localStorage.getItem('auth');
    if(walletState === 'metaMask') metaMask.activate();
 
  },[]);

  const contextProps = useMemo(
    () => ({
      ...authState,
      deleteToken,
      addToken,
      setAuthState,
      addUser,
      addKey,
      logout,
      roles,
      method: 'jwt',
    }),
    [authState, roles, logout, setAuthState]
  );

  return <AppAuthContext.Provider value={contextProps}>{children}</AppAuthContext.Provider>;
}

export { AppAuthContext, AuthProvider };

export const useAppAuthContext = () => useContext(AppAuthContext);
