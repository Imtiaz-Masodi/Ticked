import { FormikFormProps } from "../../types/FormikFormProps";

export type RegistrationFormValues = {
  name: string;
  email: string;
  password: string;
  retypePassword: string;
};

export type RegistrationFormProps = FormikFormProps<RegistrationFormValues>;
