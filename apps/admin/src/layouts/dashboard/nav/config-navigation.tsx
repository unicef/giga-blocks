import {
  PATH_DASHBOARD,
  PATH_USER,
  PATH_SCHOOL,
  PATH_CONTRIBUTE,
  PATH_VALID,
} from '../../../routes/paths';
import SvgColor from '../../../components/svg-color';

const basePath = process.env.NEXT_PUBLIC_ADMIN_BASE_PATH
const icon = (name: string) => (
  <SvgColor src={`${basePath}/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  dashboard: icon('ic_dashboard'),
  user: icon('ic_user'),
  analytics: icon('ic_analytics'),
  catalog: icon('ic_file'),
};

const navConfig = [
  {
    subheader: 'General',
    items: [
      {
        title: 'Dashboard',
        path: PATH_DASHBOARD.root,
        icon: ICONS.dashboard,
      },
    ],
  },
  {
    items: [
      {
        title: 'School',
        path: PATH_SCHOOL.contributed,
        children: [
          {
            title: 'Unminted School',
            path: PATH_SCHOOL.contributed,
          },
          {
            title: 'Import School',
            path: PATH_SCHOOL.import,
          },
          {
            title: 'Minting School',
            path: PATH_SCHOOL.minting,
          },
          {
            title: 'Minted NFT',
            path: PATH_SCHOOL.verified,
          },
        ],
        icon: ICONS.user,
      },
    ],
  },
  {
    items: [
      {
        title: 'Contributions',
        path: PATH_CONTRIBUTE.root,
        icon: ICONS.user,
      },
    ],
  },
  {
    items: [
      {
        title: 'Valid Data',
        path: PATH_VALID.root,
        icon: ICONS.user,
      },
    ],
  },
  {
    items: [
      {
        title: 'Users',
        path: PATH_USER.admin,
        children: [
          {
            title: 'Admins',
            path: PATH_USER.admin,
          },
          {
            title: 'Contributors',
            path: PATH_USER.contributer,
          },
        ],
        icon: ICONS.user,
      },
    ],
  },
];

export default navConfig;
