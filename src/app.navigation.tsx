/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {NavigationContainer, LinkingOptions} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {TransitionSpecs, createStackNavigator} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';
import {Icon} from '@core/components';
import {useAppTheme, useAuth} from '@core/contexts';
import {MODAL_SCREEN_NAME, SCREEN_NAME} from '@app/app.constants';
import {trackScreen} from '@core/analytics';
import {config} from '@core/config';
import {
  CourseDetailScreen,
  CoursesScreen,
  ForgotPasswordScreen,
  HomeScreen,
  SettingsScreen,
  SignInPhoneNoScreen,
  SignInScreen,
  WebViewScreen,
  PodCastScreen,
} from '@app/screens';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {PodCastDetailScreen} from '@app/screens/modal';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
const StackSharedElement = createSharedElementStackNavigator();

interface TabItem {
  name: string;
  title: string;
  icon: string;
  iconFocused: string;
  component: React.FunctionComponent;
}

interface StackItem {
  name: string;
  component: React.FunctionComponent;
}
const Courses = () => {
  return (
    <StackSharedElement.Navigator screenOptions={{headerShown: false}} initialRouteName={SCREEN_NAME.COURSES}>
      <StackSharedElement.Screen name={SCREEN_NAME.COURSES} key={SCREEN_NAME.COURSES} component={CoursesScreen} />
      <StackSharedElement.Screen
        sharedElements={(route, otherRoute, showing) => {
          const {item} = route.params;
          return [`item.${item.id}.photo`];
        }}
        name={SCREEN_NAME.COURSE_DETAIL}
        key={SCREEN_NAME.COURSE_DETAIL}
        component={CourseDetailScreen}
      />
    </StackSharedElement.Navigator>
  );
};
const MainTabs = (): JSX.Element => {
  const {t} = useTranslation('common');
  const {appTheme} = useAppTheme();
  const tabItems: TabItem[] = [
    {
      name: SCREEN_NAME.HOME,
      title: t('home'),
      icon: 'view-dashboard-outline',
      iconFocused: 'view-dashboard',
      component: HomeScreen,
    },
    {
      name: SCREEN_NAME.COURSES,
      title: t('courses'),
      icon: 'book-open-page-variant-outline',
      iconFocused: 'book-open-page-variant',
      component: Courses,
    },
    {
      name: SCREEN_NAME.POD_CASTS,
      title: t('pod-casts'),
      icon: 'play-circle',
      iconFocused: 'play-circle-outline',
      component: PodCastScreen,
    },
    {
      name: SCREEN_NAME.SETTINGS,
      title: t('settings'),
      icon: 'cog-outline',
      iconFocused: 'cog',
      component: SettingsScreen,
    },
  ];
  return (
    <Tab.Navigator
      labeled={false}
      shifting
      initialRouteName={SCREEN_NAME.HOME}
      barStyle={{backgroundColor: appTheme.colors.primary}}>
      {tabItems.map((tabItem, index) => (
        <Tab.Screen
          key={tabItem.name}
          name={tabItem.name}
          component={tabItem.component}
          options={{
            title: tabItem.title,
            tabBarIcon: (iconProps) => {
              const {focused, color} = iconProps;
              return <Icon name={focused ? tabItem.iconFocused : tabItem.icon} color={color} size={25} />;
            },
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export const AppNavigation = (): JSX.Element => {
  const {auth} = useAuth();
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();
  const {appTheme} = useAppTheme();

  const stackItems: StackItem[] = [
    {
      name: SCREEN_NAME.MAIN_TABS,
      component: MainTabs,
    },
    {
      name: SCREEN_NAME.WEB_VIEW,
      component: WebViewScreen,
    },
    {
      name: SCREEN_NAME.SIGN_IN,
      component: SignInScreen,
    },
    {
      name: SCREEN_NAME.FORGOT_PASSWORD,
      component: ForgotPasswordScreen,
    },
    {
      name: SCREEN_NAME.SIGN_IN_PHONE_NO,
      component: SignInPhoneNoScreen,
    },
  ];

  const linking: LinkingOptions<any> = {
    prefixes: config().deepLink.prefixes,
    config: {
      screens: {
        [SCREEN_NAME.SIGN_IN]: 'signin',
        [SCREEN_NAME.MAIN_TABS]: {
          screens: {
            [SCREEN_NAME.HOME]: 'home',
            [SCREEN_NAME.SETTINGS]: 'settings',
          },
        },
      },
    },
  };

  return (
    <NavigationContainer
      ref={navigationRef as any}
      onReady={() => {
        routeNameRef.current = (navigationRef.current as any).getCurrentRoute().name;
      }}
      onStateChange={() => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = (navigationRef.current as any).getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          trackScreen(currentRouteName);
        }

        // Save the current route name for later comparison
        routeNameRef.current = currentRouteName;
      }}
      linking={linking}>
      <Stack.Navigator initialRouteName={auth.isSignedIn ? SCREEN_NAME.MAIN_TABS : SCREEN_NAME.SIGN_IN}>
        {stackItems.map((stackItem) => (
          <Stack.Screen
            key={stackItem.name}
            name={stackItem.name}
            component={stackItem.component}
            options={{header: () => <></>}}
          />
        ))}
        <Stack.Group
          screenOptions={{
            presentation: 'modal',
            headerStyle: {
              backgroundColor: appTheme.colors.background,
              borderBottomWidth: 0,
              shadowRadius: 0,
              shadowOffset: {height: 0, width: 0},
            },
            headerTintColor: appTheme.colors.text,
          }}>
          <Stack.Screen
            name={MODAL_SCREEN_NAME.POD_CAST_DETAIL}
            options={{title: 'The Creative Boom Podcast'}}
            component={PodCastDetailScreen}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
