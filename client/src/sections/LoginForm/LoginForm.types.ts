import { FormikFormProps } from "../../types/FormikFormProps";

export type LoginFormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type LoginFormProps = FormikFormProps<LoginFormValues>;
