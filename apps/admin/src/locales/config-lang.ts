// @mui
import { enUS, frFR, zhCN, viVN, arSA } from '@mui/material/locale';
import {nextConfig} from "../../next.config";

const basePath = nextConfig.basePath || '';

// PLEASE REMOVE `LOCAL STORAGE` WHEN YOU CHANGE SETTINGS.
// ----------------------------------------------------------------------

export const allLangs = [
  {
    label: 'English',
    value: 'en',
    systemValue: enUS,
    icon: `${basePath}/assets/icons/flags/ic_flag_en.svg`,
  },
  {
    label: 'French',
    value: 'fr',
    systemValue: frFR,
    icon: `${basePath}/assets/icons/flags/ic_flag_fr.svg`,
  },
  {
    label: 'Vietnamese',
    value: 'vi',
    systemValue: viVN,
    icon: `${basePath}/assets/icons/flags/ic_flag_vn.svg`,
  },
  {
    label: 'Chinese',
    value: 'cn',
    systemValue: zhCN,
    icon: `${basePath}/assets/icons/flags/ic_flag_cn.svg`,
  },
  {
    label: 'Arabic (Sudan)',
    value: 'ar',
    systemValue: arSA,
    icon: `${basePath}/assets/icons/flags/ic_flag_sa.svg`,
  },
];

export const defaultLang = allLangs[0]; // English
