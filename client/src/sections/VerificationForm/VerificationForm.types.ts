export interface VerificationFormValues {
  otp: string;
}

export interface VerificationFormProps {
  values: VerificationFormValues;
  errors: Partial<VerificationFormValues>;
  touched: Partial<{ [field in keyof VerificationFormValues]: boolean }>;
  isSubmitting: boolean;
  handleSubmit: () => void;
  setFieldValue: (field: string, value: string) => void;
  email?: string;
  onResendOTP?: () => void;
  resendDisabled?: boolean;
  resendCountdown?: number;
  disableForm?: boolean;
}
