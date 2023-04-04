import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { DEFAULT_LANGUAGE } from '@core/contexts';
import commonEn from '@assets/json/locales/en/common.json';
import settingsEn from '@assets/json/locales/en/settings.json';
import authEn from '@assets/json/locales/en/auth.json';

i18next.use(initReactI18next).init({
	lng: DEFAULT_LANGUAGE,
	debug: __DEV__,
	resources: {
		en: {
			common: commonEn,
			settings: settingsEn,
			auth: authEn,
		},
	},
});

export { i18next };
