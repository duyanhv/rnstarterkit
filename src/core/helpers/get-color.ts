import {ColorType, AppThemeState} from '../contexts/app-theme.context';

export const getColor = (type: ColorType = 'success', theme: AppThemeState): string => {
  let color: string;
  switch (type) {
    case 'danger':
      color = theme.colors.error;
      break;
    case 'warning':
      color = theme.colors.warning;
      break;
    case 'info':
      color = theme.colors.info;
      break;
    case 'default':
      color = theme.colors.primary;
      break;
    default:
      color = theme.colors.success;
  }
  return color;
};
