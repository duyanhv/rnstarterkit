import React from 'react';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {Button, Layout, View, FormField, FormInput} from '@core/components';
import {useForm, useNotification} from '@core/hooks';
import {styles} from './forgot-password.styles';
import { useAuth } from '@app/core/contexts';

interface FormData {
  email: string;
}

export const ForgotPasswordScreen = (): JSX.Element => {
  const {t} = useTranslation('auth');
  const navigation = useNavigation();
  const {
    dispatch: {sendPasswordResetEmail},
  } = useAuth();
  const {showNotification} = useNotification();

  const initialValues: FormData = {
    email: '',
  };

  const validationSchema: Yup.ObjectSchema<FormData> = Yup.object().shape({
    email: Yup.string().email(t('common:invalid') as string).required(t('common:required') as string),
  });

  const onSubmit = async (formValues: FormData): Promise<void> => {
    await sendPasswordResetEmail(formValues.email);
    showNotification({message: t('requestHasBeenSent', {email: formValues.email})});
    navigation.goBack();
  };

  const form = useForm<FormData>({
    initialValues,
    validationSchema,
    onSubmit,
  });
  const {submitForm} = form;
  const emailField: FormField<FormData> = {
    name: 'email',
    type: 'text',
  };
  return (
    <Layout header headerBackButton headerTitle={t('recoverPassword') as string} style={styles.container}>
      <View>
        <FormInput form={form} t={t} field={emailField} />
        <Button style={styles.button} onPress={submitForm} mode='contained'>
          {t('send')}
        </Button>
      </View>
    </Layout>
  );
};
