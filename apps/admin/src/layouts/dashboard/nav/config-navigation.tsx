// routes
import { PATH_DASHBOARD, PATH_USER, PATH_SCHOOL } from '../../../routes/paths';
// components
import SvgColor from '../../../components/svg-color';
import { ROLES } from '../../../config-global';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  dashboard: icon('ic_dashboard'),
  user: icon('ic_user'),
  analytics: icon('ic_analytics'),
  catalog: icon('ic_file'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'General',
    items: [
      {
        title: 'Dashboard',
        path: PATH_DASHBOARD.root,
        icon: ICONS.dashboard,
      }
    ],
  },
  {
    items: [
      {
        title: 'ADMINS',
        path: PATH_USER.root,
        children: [
          {
            title: 'User Info',
            path: PATH_USER.list,
          },
        ],
        icon: ICONS.user
      },
    ],
  },
  {
    items: [
      {
        title: 'SCHOOL',
        path: PATH_SCHOOL.root,
        children: [
          {
            title: 'Verified School',
            path: PATH_SCHOOL.verified,
          },
          {
            title: 'Contributed School',
            path: PATH_SCHOOL.contributed,
          }
        ],
        icon: ICONS.user
      },
    ],
  },
];

export default navConfig;
