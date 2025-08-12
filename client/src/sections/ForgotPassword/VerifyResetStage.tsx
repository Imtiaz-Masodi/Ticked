import { Button } from "../../components/Button";
import { ButtonType } from "../../components/Button/Button.enum";
import { Size } from "../../utils/enums";
import { OTPInput } from "../../components/OTPInput";

type Props = {
  email: string;
  otp: string;
  setOtp: (v: string) => void;
  isSubmitting: boolean;
  resendCountdown: number;
  onVerify: () => void;
  onResend: () => void;
  onChangeEmail: () => void;
};

export const VerifyResetStage = ({
  email,
  otp,
  setOtp,
  isSubmitting,
  resendCountdown,
  onVerify,
  onResend,
  onChangeEmail,
}: Props) => {
  return (
    <>
      <div className="mb-6">
        <div className="text-center mb-4">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">We've sent a 6-digit verification code to</p>
          <p className="text-gray-900 dark:text-white font-medium">{email}</p>
        </div>

        <OTPInput length={6} value={otp} onChange={(val) => setOtp(val)} disabled={isSubmitting} />
      </div>

      <Button onClick={onVerify} isLoading={isSubmitting} className="w-full mb-2">
        Verify Code
      </Button>

      <div className="flex justify-center items-center text-sm">
        <span className="text-gray-600 dark:text-gray-400 text-sm">Didn't receive the code?</span>
        {resendCountdown > 0 ? (
          <p className="text-gray-500 dark:text-gray-500 text-sm ml-2">Resend code in {resendCountdown}s</p>
        ) : (
          <Button
            type={ButtonType.link}
            size={Size.sm}
            onClick={onResend}
            disabled={isSubmitting}
            className="ps-1 pe-1"
          >
            Resend Code
          </Button>
        )}
      </div>

      <div className="flex justify-center items-center text-sm mt-4">
        <span className="text-zinc-700 dark:text-gray-300 select-none">Wrong email?</span>
        <Button
          type={ButtonType.link}
          size={Size.sm}
          onClick={onChangeEmail}
          disabled={isSubmitting}
          className="ps-1 pe-1"
        >
          Change Email
        </Button>
      </div>
    </>
  );
};
