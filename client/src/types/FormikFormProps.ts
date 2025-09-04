import { FormikHelpers, FormikErrors, FormikTouched } from "formik";

export type FormikFormProps<TValues> = FormikHelpers<TValues> & {
  values: TValues;
  errors: FormikErrors<TValues>;
  touched: FormikTouched<TValues>;
  isSubmitting: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
};
