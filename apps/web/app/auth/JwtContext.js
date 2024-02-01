'use client';

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
import { useWeb3React } from '@web3-react/core';

import {
  isValidToken,
  saveAccessToken,
  getAccessToken,
  deleteAccessToken,
  saveCurrentUser,
  saveKey,
  getCurrentUser,
  clearStorage,
  getConnectors,
} from '../utils/sessionManager';
import { metaMask } from '../components/web3/connectors/metamask';
import { ActionableNotification } from '@carbon/react';

// ----------------------------------------------------------------------

const ROLES = {
  SUPERADMIN: 'ADMIN',
  USER: 'USER',
};

const ROOTS_AUTH = '/auth';

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
  initialize: () => {},
  checkAccessToken: () => {},
};

const AppAuthContext = createContext({
  ...initialState,
  method: 'jwt',
});

function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(initialState);
  const [notification, setNotification] = useState(null);
  const { push, replace } = useRouter();
  const web3 = useWeb3React();

  useEffect(() => {
    if (notification) {
      const timeoutId = setTimeout(() => {
        onCloseNotification();
      }, 4000);

      return () => clearTimeout(timeoutId);
    }
  }, [notification]);

  const onCloseNotification = () => {
    setNotification(null);
  };

  const initialize = useCallback(async () => {
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
      } else if (localToken && !isValidToken(localToken)) {
        clearStorage();
        setNotification({
          kind: 'error',
          title: 'Session expired',
          subtitle: 'Please login again',
          actionButtonLabel: 'Login',
          onActionButtonClick: () => {
            push('/signIn');
            onCloseNotification();
          },
        });
        setAuthState((prev) => ({
          ...prev,
          isAuthenticated: false,
          isInitialized: true,
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
  }, []);

  const checkAccessToken = useCallback(async () => {
    const localToken = getAccessToken();
    if (localToken && !isValidToken(localToken)) {
      clearStorage();
      setNotification({
        kind: 'error',
        title: 'Session expired',
        subtitle: 'Please login again',
        actionButtonLabel: 'Login',
        onActionButtonClick: () => {
          push('/signIn');
          onCloseNotification();
        },
      });
      setAuthState((prev) => ({
        ...prev,
        isAuthenticated: false,
        isInitialized: true,
      }));
    }
  }, [push]);

  useEffect(() => {
    initialize();
  }, [push]);

  useEffect(() => {
    const connectors = getConnectors();
    if (
      (connectors && connectors === 'metaMask' && !web3.isActive) ||
      localStorage.getItem('wallet') === 'metamask'
    ) {
      metaMask.activate();
    }
  }, [web3]);

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
      initialize,
      checkAccessToken,
    }),
    [authState, roles, logout]
  );

  return (
    <>
      {notification && (
        <ActionableNotification
          aria-label="closes notification"
          kind={notification.kind}
          onClose={onCloseNotification}
          onActionButtonClick={notification.onActionButtonClick}
          subtitle={notification.subtitle}
          title={notification.title}
          actionButtonLabel={notification.actionButtonLabel}
          style={{
            position: 'fixed',
            top: '50px',
            right: '2px',
            zIndex: 1000,
          }}
        />
      )}
      <AppAuthContext.Provider value={contextProps}>
        {children}
      </AppAuthContext.Provider>
    </>
  );
}

export { AppAuthContext, AuthProvider };

export const useAppAuthContext = () => useContext(AppAuthContext);
