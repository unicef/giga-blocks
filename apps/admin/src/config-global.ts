// routes
import { PATH_DASHBOARD } from './routes/paths';

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;
export const BACKEND_URL = process.env.NEXT_PUBLIC_D3_BACKEND || '';
export const DEBUG_MODE = process.env.NEXT_PUBLIC_DEBUG_MODE === 'true' || false;
export const OTP_DURATION = 2;

// API
// ----------------------------------------------------------------------

export const HOST_API_KEY = process.env.HOST_API_KEY || '';

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = PATH_DASHBOARD;

// LAYOUT
// ----------------------------------------------------------------------

export const HEADER = {
  H_MOBILE: 64,
  H_MAIN_DESKTOP: 88,
  H_DASHBOARD_DESKTOP: 92,
  H_DASHBOARD_DESKTOP_OFFSET: 92 - 32,
};

export const NAV = {
  W_BASE: 260,
  W_LARGE: 320,
  W_DASHBOARD: 280,
  W_DASHBOARD_MINI: 88,
  //
  H_DASHBOARD_ITEM: 48,
  H_DASHBOARD_ITEM_SUB: 36,
  //
  H_DASHBOARD_ITEM_HORIZONTAL: 32,
};

export const ICON = {
  NAV_ITEM: 24,
  NAV_ITEM_HORIZONTAL: 22,
  NAV_ITEM_MINI: 22,
};

export const ROLES = {
  SUPERADMIN: 'ADMIN',
  USER: 'USER',
};
