// ----------------------------------------------------------------------

export type ActionMapType<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type AuthUserType = null | Record<string, any>;

export type AuthStateType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUserType;
};

// ----------------------------------------------------------------------

export type JWTContextType = {
  method: string;
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUserType;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => void;
  loginWithGoogle?: () => void;
  loginWithGithub?: () => void;
  loginWithTwitter?: () => void;
};

export interface Roles {
  isSuperAdmin: boolean;
  isUser: boolean;
}

export interface AuthState {
  isDebug: boolean;
  isAuthenticated: boolean;
  isInitialized: boolean;
  token: string | null;
  user: any;
  roles: Roles;
  addToken: (payload: string) => void;
  deleteToken: () => void;
  addUser: (user: any) => void;
  addKey: (payload: any) => void;
  logout: () => void;
}

export interface ExtendedAuthState extends AuthState {
  method: string;
  setAuthState?:any;
}
