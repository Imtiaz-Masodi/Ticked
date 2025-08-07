import { Button } from "../../components/Button";
import { ButtonType } from "../../components/Button/Button.enum";
import { OTPInput } from "../../components/OTPInput";
import { Size } from "../../utils/enums";
import { VerificationFormProps } from "./VerificationForm.types";

export function VerificationForm(props: VerificationFormProps) {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    setFieldValue,
    email,
    onResendOTP,
    resendDisabled = false,
    resendCountdown = 0,
    disableForm = false,
  } = props;

  const handleOTPChange = (otp: string, otpPasted: boolean = false) => {
    setFieldValue("otp", otp);
    if (otpPasted) {
      setTimeout(handleSubmit, 250);
    }
  };

  return (
    <>
      <div className="mb-6">
        <div className="text-center mb-4">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">We've sent a 6-digit verification code to</p>
          {email && <p className="text-gray-900 dark:text-white font-medium">{email}</p>}
        </div>

        <OTPInput
          length={6}
          value={values.otp}
          onChange={handleOTPChange}
          disabled={isSubmitting || disableForm}
          errorMessage={touched.otp ? errors.otp : undefined}
          className="mb-4"
        />
      </div>

      <Button
        type={ButtonType.solid}
        size={Size.lg}
        onClick={handleSubmit}
        disabled={isSubmitting || disableForm}
        className="w-full mb-2"
      >
        {isSubmitting ? "Verifying..." : "Verify Email"}
      </Button>

      <div className="flex justify-center items-center text-sm">
        <span className="text-gray-600 dark:text-gray-400 text-sm">Didn't receive the code?</span>
        {resendCountdown > 0 ? (
          <p className="text-gray-500 dark:text-gray-500 text-sm ml-2">Resend code in {resendCountdown}s</p>
        ) : (
          <Button
            type={ButtonType.link}
            size={Size.sm}
            onClick={onResendOTP || (() => {})}
            disabled={resendDisabled || isSubmitting || disableForm || !onResendOTP}
            className="ps-1 pe-1"
          >
            Resend Code
          </Button>
        )}
      </div>
    </>
  );
}
