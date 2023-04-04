import { useFormik, FormikConfig, FormikContextType, FormikValues } from 'formik';
import { useLoading } from '@core/contexts';

export const useForm = (params: FormikConfig<FormikValues> & { showLoading?: boolean }): FormikContextType<FormikValues> => {
	const { showLoading = true, ...config } = params;
	const form = useFormik<FormikValues>(config);
	const { setLoading } = useLoading();

	const submitForm = async (): Promise<void> => {
		const validation = await form.validateForm();
		if (Object.keys(validation).length > 0) {
			return;
		}

		showLoading && setLoading(true);
		await config.onSubmit(form.values, form);
		showLoading && setLoading(false);
	};

	return { ...form, submitForm };
};
