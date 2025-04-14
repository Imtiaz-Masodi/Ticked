import { LoginFormValues } from "./LoginForm.types";

export function validateForm(values: LoginFormValues) {
  const errors: Partial<LoginFormValues> = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!values.email) {
    errors.email = "Email is required";
  } else if (emailRegex.test(values.email) === false) {
    errors.email = "Email is invalid";
  }
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be of at least 8 characters";
  }
  return errors;
}
