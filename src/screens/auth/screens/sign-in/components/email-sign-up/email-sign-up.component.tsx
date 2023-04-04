import React, {useEffect, useState} from 'react';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {Button, FormInput, FormField} from '@core/components';
import {SCREEN_NAME} from '@app/app.constants';
import {useForm} from '@core/hooks';
import {styles} from './email-sign-up.styles';
import {useAuth} from '@app/core/contexts';
import {useClearSignInForm} from '@app/screens/auth/contexts';
import { StackNavigationProp } from '@react-navigation/stack';

interface FormData {
  email: string;
  password: string;
  passwordConfirmation?: string;
}

export const EmailSignUp = (): JSX.Element => {
  const {t} = useTranslation('auth');
  const navigation = useNavigation<StackNavigationProp<any>>();
  const {
    dispatch: {signUpEmail},
  } = useAuth();
  const {toggleClearSignInForm, clearSignInForm} = useClearSignInForm();

  const [initialValues] = useState<FormData>({
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const validationSchema: Yup.ObjectSchema<FormData> = Yup.object().shape({
    email: Yup.string()
      .email(t('common:invalid') as string)
      .required(t('common:required') as string),
    password: Yup.string()
      .required(t('common:required') as string)
      .min(8, t('passwordMinLengthRequired', {minLength: 8}) as string)
      .matches(/(?=.*?[A-Z])/, t('passwordUpperCaseRequired') as string)
      .matches(/(?=.*?[a-z])/, t('passwordLowerCaseRequired') as string)
      .matches(/(?=.*?[0-9])/, t('passwordDigitRequired') as string)
      .matches(/(?=.*?[#?!@$%^&*-])/, t('passwordSpecialCharacterRequired') as string),
    passwordConfirmation: Yup.string()
      .required(t('common:required') as string)
      .oneOf([Yup.ref('password')], t('passwordMustMatch') as string),
  });

  const onSubmit = async (formValues: FormData): Promise<void> => {
    const {email, password} = formValues;
    const isSignedIn = await signUpEmail({
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
    {
      name: 'passwordConfirmation',
      type: 'text',
      secureTextEntry: true,
    },
  ];

  useEffect(() => {
    setValues(initialValues, false);
  }, [initialValues, setValues, toggleClearSignInForm]);

  return (
    <>
      {fields.map((field, index) => (
        <FormInput key={index.toString()} form={form} t={t} field={field} />
      ))}
      <Button style={styles.button} onPress={submitForm} mode='contained'>
        {t('signUp')}
      </Button>
    </>
  );
};
