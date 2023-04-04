import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Platform} from 'react-native';
import {SCREEN_NAME} from '@app/app.constants';
import {View, IconButton} from '@core/components';
import {SignInType, useAuth, useLoading} from '@core/contexts';
import {styles} from './social-sign-in.styles';
import { useClearSignInForm } from '@app/screens/auth/contexts';
import { StackNavigationProp } from '@react-navigation/stack';

export const SocialSignIn = (): JSX.Element => {
  const {
    auth,
    dispatch: {signInFacebook, signInGoogle, signInApple},
  } = useAuth();
  const navigation = useNavigation<StackNavigationProp<any>>();
  const {setLoading} = useLoading();
  const {clearSignInForm} = useClearSignInForm();

  const signIn = async (signInType: SignInType): Promise<void> => {
    if (auth.isSignedIn) {
      return;
    }
    setLoading(true);
    let isSignedIn = false;

    switch (signInType) {
      case 'APPLE':
        isSignedIn = await signInApple();
        break;
      case 'GOOGLE':
        isSignedIn = await signInGoogle();
        break;
      case 'FACEBOOK':
        isSignedIn = await signInFacebook();
        break;
      default:
        return;
    }

    if (isSignedIn) {
      clearSignInForm();
      setTimeout(() => navigation.navigate(SCREEN_NAME.MAIN_TABS), 100);
    }
    setLoading(false);
  };
  return (
    <View style={styles.container}>
      <IconButton icon='facebook' size={40} onPress={() => signIn('FACEBOOK')} />
      <IconButton icon='google' size={40} onPress={() => signIn('GOOGLE')} />
      {Platform.OS === 'ios' && <IconButton icon='apple' size={40} onPress={() => signIn('APPLE')} />}
    </View>
  );
};
