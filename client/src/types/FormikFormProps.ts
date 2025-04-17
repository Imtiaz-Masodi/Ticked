import { FormikHelpers } from "formik";

export type FormikFormProps<TValues> = FormikHelpers<TValues> & {
  values: TValues;
  errors: {
    [key in keyof TValues]?: string;
  };
  touched: {
    [key in keyof TValues]?: boolean;
  };
  isSubmitting: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
};
