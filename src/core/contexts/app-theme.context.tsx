import React, {useContext, useEffect, useMemo, useCallback} from 'react';
import {useImmer} from 'use-immer';
import {useColorScheme} from 'react-native';
import {EVENT_NAME} from '@app/app.constants';
import {usePersistenceImmer} from '@core/hooks/use-persistence';
import {MessageType} from 'react-native-flash-message';
import { logEvent } from '../analytics';

interface AppThemeProviderProps {
  children?: React.ReactNode;
}

export interface AppThemeState {
  useSystemTheme: boolean;
  darkMode: boolean;
  theme: 'light' | 'dark';
  primaryColorId: string;
  colors: {
    primary: string;
    warning: string;
    error: string;
    success: string;
    info: string;
    text: string;
	surface: string;
    background: string;
  };
}

interface Dispatch {
  setUseSystemTheme: (useSystemTheme: boolean) => void;
  setDarkMode: (dark: boolean) => void;
  setPrimaryColor: (primaryColor: string) => void;
}

interface Color {
  id: string;
  color: string;
  darkColor: string;
  text: string;
}

export const COLORS_LOOKUP: {[id: string]: Color} = {
  CYAN: {
    id: 'CYAN',
    color: '#AEE2FF',
    darkColor: '#B9F3FC',
    text: 'Cyan',
  },
  ORANGE: {
    id: 'ORANGE',
    color: '#FFDCA9',
    darkColor: '#FAAB78',
    text: 'Orange',
  },
  RED: {
    id: 'RED',
    color: '#EB6383',
    darkColor: '#FA9191',
    text: 'Red',
  },
  GREEN: {
    id: 'GREEN',
    color: '#B5F1CC',
    darkColor: '#BCE29E',
    text: 'Green',
  },
  GRAY: {
	id: 'GRAY',
    color: '#EFEFEF',
    darkColor: '#7F7C82',
    text: 'Gray',
  }
};
export const COLORS = Object.keys(COLORS_LOOKUP).map((key: string) => COLORS_LOOKUP[key]);
export const LIGHT_BACKGROUND_COLOR = '#fff';
export const DARK_BACKGROUND_COLOR = '#41444B';
export type ColorType = MessageType;

export const DEFAULT_APP_THEME: AppThemeState = {
  useSystemTheme: true,
  darkMode: false,
  theme: 'light',
  primaryColorId: COLORS_LOOKUP.ORANGE.id,
  colors: {
    primary: COLORS_LOOKUP.ORANGE.color,
    warning: COLORS_LOOKUP.ORANGE.color,
    error: COLORS_LOOKUP.RED.color,
    success: COLORS_LOOKUP.GREEN.color,
    info: DARK_BACKGROUND_COLOR,
    text: DARK_BACKGROUND_COLOR,
    background: LIGHT_BACKGROUND_COLOR,
	surface: LIGHT_BACKGROUND_COLOR
  },
};

const APP_THEME_KEY = 'APP_THEME';

const AppThemeContext = React.createContext(DEFAULT_APP_THEME);
const AppThemeDispatchContext = React.createContext<Dispatch>(undefined as never);

const AppThemeProvider = (props: AppThemeProviderProps): JSX.Element => {
  const {children} = props;
  const [appTheme, setAppTheme] = useImmer(DEFAULT_APP_THEME);
  const [setAppThemePersistence] = usePersistenceImmer(appTheme, setAppTheme, APP_THEME_KEY);
  const colorScheme = useColorScheme();

  const updateTheme = useCallback(
    (draft: AppThemeState): void => {
      if (draft.useSystemTheme) {
        draft.theme = colorScheme === 'dark' ? 'dark' : 'light';
      } else {
        draft.theme = draft.darkMode ? 'dark' : 'light';
      }
      const primaryColor = COLORS_LOOKUP[draft.primaryColorId];
      if (draft.theme === 'light') {
        draft.colors.success = COLORS_LOOKUP.GREEN.color;
        draft.colors.warning = COLORS_LOOKUP.ORANGE.color;
        draft.colors.error = COLORS_LOOKUP.RED.color;
        draft.colors.info = DARK_BACKGROUND_COLOR;
        draft.colors.primary = primaryColor.color;
        draft.colors.text = DARK_BACKGROUND_COLOR;
        draft.colors.background = LIGHT_BACKGROUND_COLOR;
      } else {
        draft.colors.success = COLORS_LOOKUP.GREEN.darkColor;
        draft.colors.warning = COLORS_LOOKUP.ORANGE.darkColor;
        draft.colors.error = COLORS_LOOKUP.RED.darkColor;
        draft.colors.info = LIGHT_BACKGROUND_COLOR;
        draft.colors.primary = primaryColor.darkColor;
        draft.colors.text = LIGHT_BACKGROUND_COLOR;
        draft.colors.background = DARK_BACKGROUND_COLOR;
      }
    },
    [colorScheme],
  );

  useEffect(() => {
    setAppThemePersistence((draft) => {
      updateTheme(draft);
    });
  }, [colorScheme, setAppThemePersistence, updateTheme]);

  const dispatch = useMemo(
    (): Dispatch => ({
      setUseSystemTheme: (useSystemTheme) => {
        setAppThemePersistence((draft) => {
          if (draft.useSystemTheme === useSystemTheme) {
            return;
          }
          draft.useSystemTheme = useSystemTheme;
          updateTheme(draft);
        });
      },
      setDarkMode: (dark) => {
        setAppThemePersistence((draft) => {
          if (draft.darkMode === dark) {
            return;
          }
          draft.darkMode = dark;
          updateTheme(draft);
        });
      },
      setPrimaryColor: (primaryColor) => {
        setAppThemePersistence((draft) => {
          if (draft.primaryColorId === primaryColor) {
            return;
          }
          draft.primaryColorId = primaryColor;
          updateTheme(draft);
          logEvent(EVENT_NAME.CHANGE_PRIMARY_COLOR, {primaryColorId: primaryColor});
        });
      },
    }),
    [setAppThemePersistence, updateTheme],
  );
  return (
    <AppThemeContext.Provider value={appTheme}>
      <AppThemeDispatchContext.Provider value={dispatch}>{children}</AppThemeDispatchContext.Provider>
    </AppThemeContext.Provider>
  );
};

const useAppTheme = (): {appTheme: AppThemeState; dispatch: Dispatch} => {
  const appTheme = useContext(AppThemeContext);
  const dispatch = useContext(AppThemeDispatchContext);
  return {appTheme, dispatch};
};

export {AppThemeProvider, useAppTheme};
