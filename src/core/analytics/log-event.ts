/* eslint-disable @typescript-eslint/no-explicit-any */
type SignInType = 'EMAIL' | 'PHONE_NO' | 'FACEBOOK' | 'GOOGLE' | 'APPLE';
export interface ConfigAnalyticsParams {
	userId: string;
}
export const configAnalytics = async (params: ConfigAnalyticsParams): Promise<void> => {
	const { userId } = params;
	// Set up your analytics framework here
};

export const logEvent = async (name: string, data?: { [key: string]: any }): Promise<void> => {
	try {
		console.log(name, data)
	} catch (err) {
		// ignore error
	}
};

export const logAuthEvent = async (signType: 'SIGN_UP' | 'SIGN_IN', method: SignInType): Promise<void> => {
	try {
		console.log(signType, method)
	} catch (err) {
		// ignore error
	}
};
