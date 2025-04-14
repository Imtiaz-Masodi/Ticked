import { EMAIL_REGEX } from "../../utils/constants";
import { RegistrationFormValues } from "./RegistrationForm.types";

export function validateRegistrationForm(values: RegistrationFormValues) {
  const errors: Partial<RegistrationFormValues> = {};

  if (!values.name || values.name.trim() === "") {
    errors.name = "Name is required";
  } else if (values.name.length < 3) {
    errors.name = "Name must be at least 3 characters";
  }

  if (!values.email || values.email.trim() === "") {
    errors.email = "Email is required";
  } else if (EMAIL_REGEX.test(values.email) === false) {
    errors.email = "Email is invalid";
  }

  if (!values.password || values.password.trim() === "") {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be of at least 8 characters";
  }

  if (!values.retypePassword || values.retypePassword.trim() === "") {
    errors.retypePassword = "ReType Password is required";
  }
  if (values.password !== values.retypePassword) {
    errors.retypePassword = "Passwords do not match";
  }

  return errors;
}
