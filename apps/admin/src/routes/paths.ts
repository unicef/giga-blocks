// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';
// const ROOTS_VISUALIZATION = '/visualizations';
const ROOTS_ACTIVITY_LOGS = '/activity-logs';
const ROOTS_USER = '/users';
const ROOTS_SCHOOL = '/school';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  verify: path(ROOTS_AUTH, '/verify'),
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
};

// export const PATH_VISUALIZATION = {
//   root: ROOTS_VISUALIZATION,
//   service_providers: path(ROOTS_VISUALIZATION, '/lso-service-providers'),
//   solution_providers: path(ROOTS_VISUALIZATION, '/lso-solution-providers'),
//   company: path(ROOTS_VISUALIZATION, '/company'),
//   compatibility: path(ROOTS_VISUALIZATION, '/compatibility-arc'),
//   api: path(ROOTS_VISUALIZATION, '/api-visualization'),
//   operator_status: path(ROOTS_VISUALIZATION, '/itn-operator-status'),
// };

export const PATH_USER = {
  root: ROOTS_USER,
  list: path(ROOTS_USER, '/'),
  new: path(ROOTS_USER, '/new'),
  profile: path(ROOTS_USER, '/profile'),
  account: path(ROOTS_USER, '/account'),
  edit: (id: string) => path(ROOTS_USER, `/${id}/edit`),
};

export const PATH_ACTIVITY_LOGS = {
  root: ROOTS_ACTIVITY_LOGS,
};

export const PATH_SCHOOL = {
  root: ROOTS_SCHOOL,
  verified: path(ROOTS_SCHOOL, '/minted'),
  contributed: path(ROOTS_SCHOOL, '/un-minted')
};
