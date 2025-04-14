import { LoginFormValues } from "./LoginForm.types";
import { EMAIL_REGEX } from "../../utils/constants";

export function validateForm(values: LoginFormValues) {
  const errors: Partial<LoginFormValues> = {};

  if (!values.email) {
    errors.email = "Email is required";
  } else if (EMAIL_REGEX.test(values.email) === false) {
    errors.email = "Email is invalid";
  }
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be of at least 8 characters";
  }
  return errors;
}
