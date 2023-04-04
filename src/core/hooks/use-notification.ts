import { getColor } from '@core/helpers';
import { ColorType, LIGHT_BACKGROUND_COLOR, DARK_BACKGROUND_COLOR, useAppTheme } from '@core/contexts/app-theme.context';
import { useCallback } from 'react';
import { MessageOptions, showMessage } from 'react-native-flash-message';

export interface NotificationParams extends MessageOptions {
	message: string;
	type?: ColorType;
}

export const useNotification = (): { showNotification: (params: NotificationParams) => void } => {
	const { appTheme } = useAppTheme();
	const showNotification = useCallback(
		(params: NotificationParams): void => {
			const {
				message,
				type = 'success',
				duration = 1850,
				position = 'top',
				...other
			} = params;

			const textColor: string = appTheme.theme === 'light' ? LIGHT_BACKGROUND_COLOR : DARK_BACKGROUND_COLOR;
			const backgroundColor = getColor(type, appTheme);
			showMessage({
				message,
				duration,
				position,
				color: textColor
			})
		},
		[appTheme],
	);
	return { showNotification };
};
