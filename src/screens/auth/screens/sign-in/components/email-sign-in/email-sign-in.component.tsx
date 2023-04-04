import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';
import {View, Button, FormInput, FormField} from '@core/components';
import {useForm} from '@core/hooks';
import {SCREEN_NAME} from '@app/app.constants';
import {styles} from './email-sign-in.styles';
import { useAuth } from '@app/core/contexts';
import { useClearSignInForm } from '@app/screens/auth/contexts';
import { StackNavigationProp } from '@react-navigation/stack';

interface FormData {
  email: string;
  password: string;
}

export const EmailSignIn = (): JSX.Element => {
  const {t} = useTranslation('auth');
  const navigation = useNavigation<StackNavigationProp<any>>();
  const {
    dispatch: {signInEmail},
  } = useAuth();
  const {toggleClearSignInForm, clearSignInForm} = useClearSignInForm();
  const [initialValues] = useState<FormData>({
    email: '',
    password: '',
  });
  const validationSchema: Yup.ObjectSchema<FormData> = Yup.object().shape({
    email: Yup.string().email(t('common:invalid') as string).required(t('common:required') as string),
    password: Yup.string().required(t('common:required') as string),
  });

  const onSubmit = async (formValues: FormData): Promise<void> => {
    const {email, password} = formValues;
    const isSignedIn = await signInEmail({
      email,
      password,
    });
    if (isSignedIn) {
      clearSignInForm();
      setTimeout(() => navigation.navigate(SCREEN_NAME.MAIN_TABS), 100);
    }
  };
  const form = useForm<FormData>({
    initialValues,
    validationSchema,
    onSubmit,
  });
  const {setValues, submitForm} = form;
  const fields: FormField<FormData>[] = [
    {
      name: 'email',
      type: 'text',
    },
    {
      name: 'password',
      type: 'text',
      secureTextEntry: true,
    },
  ];

  useEffect(() => {
    setValues(initialValues, false);
  }, [toggleClearSignInForm, setValues, initialValues]);

  return (
    <View>
      {fields.map((field, index) => (
        <FormInput key={index.toString()} form={form} t={t} field={field} />
      ))}
      <Button style={styles.button} onPress={submitForm} mode='contained'>
        {t('signIn')}
      </Button>
      <Button style={styles.button} onPress={() => navigation.navigate(SCREEN_NAME.SIGN_IN_PHONE_NO)} mode='contained'>
        {t('signInWithPhoneNo')}
      </Button>
      <Button style={styles.button} onPress={() => navigation.navigate(SCREEN_NAME.FORGOT_PASSWORD)}>
        {t('forgotPassword')}
      </Button>
    </View>
  );
};
