import React from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {ListItem} from '@core/components';
import {config, appFullVersion} from '@core/config';
import {SCREEN_NAME} from '@app/app.constants';
import {StackNavigationProp} from '@react-navigation/stack';

export const GeneralInfo = (): JSX.Element => {
  const {t} = useTranslation('settings');
  const navigation = useNavigation<StackNavigationProp<any>>();

  const navigateToPrivacyPolicy = (): void => {
    navigation.navigate(SCREEN_NAME.WEB_VIEW, {title: t('privacyPolicy'), url: config().appInfo.privacyPolicyUrl});
  };

  const navigateToTOS = (): void => {
    navigation.navigate(SCREEN_NAME.WEB_VIEW, {title: t('tos'), url: config().appInfo.tosUrl});
  };

  return (
    <>
      <ListItem title={t('version')} description={appFullVersion()} leftIcon='shoe-print' />
      <ListItem
        title={t('privacyPolicy')}
        leftIcon='shield-lock-outline'
        rightIcon='chevron-right'
        onPress={navigateToPrivacyPolicy}
      />
      <ListItem title={t('tos')} leftIcon='phone-lock' rightIcon='chevron-right' onPress={navigateToTOS} />
    </>
  );
};
