import { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AppLogo } from "../components/AppLogo";
import { ForgotPasswordStage, Size } from "../utils/enums";
import { Button } from "../components/Button";
import { ButtonType } from "../components/Button/Button.enum";
import { Notification, NotificationType } from "../components/Notification";
import { authService } from "../api/authService";
import { DarkModeToggle } from "../components/DarkModeToggle";
import { RequestResetStage, VerifyResetStage, ResetPasswordStage } from "../sections/ForgotPassword";
import { EMAIL_REGEX } from "../utils/constants";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const prefillEmail = searchParams.get("email") || "";

  const [stage, setStage] = useState<ForgotPasswordStage>(ForgotPasswordStage.REQUEST);
  const [email, setEmail] = useState(prefillEmail);
  const [emailTouched, setEmailTouched] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [tokenId, setTokenId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [resendCountdown, setResendCountdown] = useState(0);

  // Countdown for resend (reuse request endpoint)
  useEffect(() => {
    if (resendCountdown <= 0) return;
    const t = setTimeout(() => setResendCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCountdown]);

  const validateEmail = () => {
    if (!email) return "Email is required";
    if (!EMAIL_REGEX.test(email)) return "Email is invalid";
    return null;
  };

  const validatePasswords = () => {
    if (!newPassword) return "New Password is required";
    if (newPassword.length < 8) return "Password must be at least 8 characters";
    if (newPassword.length > 18) return "Password must be at most 18 characters";
    if (!retypePassword) return "Retype Password is required";
    if (newPassword !== retypePassword) return "Passwords do not match";
    return null;
  };

  const handleRequest = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    const emailError = validateEmail();
    setEmailTouched(true);
    if (emailError) {
      setErrorMessage(emailError);
      return;
    }
    setIsSubmitting(true);
    const resp = await authService.requestPasswordReset(email);
    setIsSubmitting(false);
    if (resp.success) {
      setStage(ForgotPasswordStage.VERIFY);
      setResendCountdown(60);
    } else {
      setErrorMessage(resp.message || "Failed to send OTP");
    }
  };

  const handleVerify = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    if (otp.length !== 6) {
      setErrorMessage("OTP must be 6 digits");
      return;
    }
    setIsSubmitting(true);
    const resp = await authService.verifyPasswordResetOtp(email, otp);
    setIsSubmitting(false);
    if (resp.success && resp.payload?.tokenId) {
      setTokenId(resp.payload.tokenId);
      setStage(ForgotPasswordStage.RESET);
    } else {
      setErrorMessage(resp.message || "Invalid OTP");
    }
  };

  const handleReset = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    const passError = validatePasswords();
    if (passError) {
      setErrorMessage(passError);
      return;
    }
    if (!tokenId) {
      setErrorMessage("Missing token. Please restart the process.");
      return;
    }
    setIsSubmitting(true);
    const resp = await authService.resetPasswordWithToken(tokenId, newPassword);
    setIsSubmitting(false);
    if (resp.success) {
      setSuccessMessage("Password updated. Redirecting to login...");
      setStage(ForgotPasswordStage.DONE);
      setTimeout(() => navigate(`/login?email=${encodeURIComponent(email)}`), 2500);
    } else {
      setErrorMessage(resp.message || "Failed to update password");
    }
  };

  const handleResend = useCallback(async () => {
    if (resendCountdown > 0) return;
    setErrorMessage(null);
    setSuccessMessage(null);
    const resp = await authService.requestPasswordReset(email);
    if (resp.success) {
      setSuccessMessage("OTP resent");
      setResendCountdown(60);
    } else {
      setErrorMessage(resp.message || "Failed to resend OTP");
    }
  }, [email, resendCountdown]);

  const passwordError =
    errorMessage && (errorMessage.includes("Password") || errorMessage.includes("Passwords"))
      ? errorMessage
      : undefined;

  return (
    <div className="min-h-dvh bg-white dark:bg-gray-900 relative pt-16">
      <div className="p-8 max-w-sm flex flex-col gap-2 mx-auto">
        <div className="my-4">
          <AppLogo size={Size.lg} className="mb-8" />
          <div className="text-center text-2xl sm:text-3xl text-black/70 dark:text-white/70 select-none">
            {stage === ForgotPasswordStage.REQUEST && "Forgot Password"}
            {stage === ForgotPasswordStage.VERIFY && "Verify Code"}
            {stage === ForgotPasswordStage.RESET && "Set New Password"}
            {stage === ForgotPasswordStage.DONE && "Password Updated"}
          </div>
          {stage === ForgotPasswordStage.REQUEST && (
            <div className="text-center text-sm text-zinc-400 dark:text-gray-500 font-light select-none">
              Enter your email to receive a reset code
            </div>
          )}
        </div>

        {errorMessage && <Notification type={NotificationType.ERROR}>{errorMessage}</Notification>}
        {successMessage && <Notification type={NotificationType.SUCCESS}>{successMessage}</Notification>}

        {stage === ForgotPasswordStage.REQUEST && (
          <RequestResetStage
            email={email}
            setEmail={setEmail}
            emailTouched={emailTouched}
            setEmailTouched={setEmailTouched}
            isSubmitting={isSubmitting}
            onSubmit={handleRequest}
            onBackToLogin={() => navigate("/login")}
            validateEmail={validateEmail}
          />
        )}

        {stage === ForgotPasswordStage.VERIFY && (
          <VerifyResetStage
            email={email}
            otp={otp}
            setOtp={setOtp}
            isSubmitting={isSubmitting}
            resendCountdown={resendCountdown}
            onVerify={handleVerify}
            onResend={handleResend}
            onChangeEmail={() => setStage(ForgotPasswordStage.REQUEST)}
          />
        )}

        {stage === ForgotPasswordStage.RESET && (
          <ResetPasswordStage
            newPassword={newPassword}
            retypePassword={retypePassword}
            setNewPassword={setNewPassword}
            setRetypePassword={setRetypePassword}
            isSubmitting={isSubmitting}
            onReset={handleReset}
            onBackToLogin={() => navigate("/login")}
            passwordError={passwordError}
          />
        )}

        {stage === ForgotPasswordStage.DONE && (
          <>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 select-none">
              Password changed successfully. Redirecting to login...
            </p>
            <div className="flex justify-center items-center text-sm mt-4">
              <Button type={ButtonType.link} onClick={() => navigate("/login")}>
                Go to Login
              </Button>
            </div>
          </>
        )}
      </div>

      <div className="fixed bottom-6 right-6 z-50">
        <DarkModeToggle withBackground={true} />
      </div>
    </div>
  );
};

export default ForgotPassword;
