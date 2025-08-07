import { VerificationFormValues } from "./VerificationForm.types";

export const validateVerificationForm = (values: VerificationFormValues) => {
  const errors: Partial<VerificationFormValues> = {};

  // OTP validation
  if (!values.otp) {
    errors.otp = "OTP is required";
  } else if (values.otp.length !== 6) {
    errors.otp = "OTP must be 6 digits";
  } else if (!/^\d{6}$/.test(values.otp)) {
    errors.otp = "OTP must contain only numbers";
  }

  return errors;
};
