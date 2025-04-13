import { FormikFormProps } from "../../utils/types";

export type LoginFormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type LoginFormProps = FormikFormProps<LoginFormValues>;
