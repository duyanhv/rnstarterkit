/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Layout, Image, Button, TabView, TabBar, SceneMap, ScrollView} from '@core/components';
import {useAppTheme, DARK_BACKGROUND_COLOR, LIGHT_BACKGROUND_COLOR} from '@core/contexts';
import {SCREEN_NAME} from '@app/app.constants';
import {SocialSignIn, LanguageSetting, EmailSignIn, EmailSignUp} from './components';
import {styles} from './sign-in.styles';
import { ClearSignInFormProvider } from '@app/screens/auth/contexts';
import { StackNavigationProp } from '@react-navigation/stack';

export const SignInScreen = (): JSX.Element => {
  const {t} = useTranslation('auth');
  const navigation = useNavigation<StackNavigationProp<any>>();
  const {appTheme} = useAppTheme();
  const backgroundColor = appTheme.theme === 'dark' ? DARK_BACKGROUND_COLOR : LIGHT_BACKGROUND_COLOR;
  const [tabIndex, setTabIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'signIn', title: t('signIn')},
    {key: 'signUp', title: t('signUp')},
  ]);
  const CONTAINER_HEIGHT = 650;
//   const marginTop = dimensions.window.height < CONTAINER_HEIGHT ? 0 : (dimensions.window.height - CONTAINER_HEIGHT) / 2;

  const renderScene = SceneMap({
    signIn: EmailSignIn,
    signUp: EmailSignUp,
  });

  return (
    <ClearSignInFormProvider>
      <Layout>
        <ScrollView contentContainerStyle={styles.container}>
          <TabView
            navigationState={{index: tabIndex, routes}}
            renderScene={renderScene}
            onIndexChange={setTabIndex}
            renderTabBar={(tabProps) => (
              <TabBar
                {...tabProps}
                style={{backgroundColor}}
                labelStyle={[styles.tabBarLabel, {color: appTheme.colors.text}]}
                indicatorStyle={{backgroundColor: appTheme.colors.primary}}
              />
            )}
          />
          <SocialSignIn />
          <Button onPress={() => navigation.navigate(SCREEN_NAME.MAIN_TABS)} uppercase={false}>
            {t('skipSignIn')}
          </Button>
          <LanguageSetting />
        </ScrollView>
      </Layout>
    </ClearSignInFormProvider>
  );
};
