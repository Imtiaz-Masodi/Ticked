import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FormikHelpers, useFormik } from "formik";
import { AppLogo } from "../components/AppLogo";
import { Notification, NotificationType } from "../components/Notification";
import { OtpPurpose, Size } from "../utils/enums";
import { DarkModeToggle } from "../components/DarkModeToggle";
import { VerificationForm, VerificationFormValues, validateVerificationForm } from "../sections/VerificationForm";
import { authService } from "../api/authService";

function VerifyEmail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [resendCountdown, setResendCountdown] = useState(0);
  const [resendDisabled, setResendDisabled] = useState(false);

  const { email, generateOtp } = useMemo(() => {
    return {
      email: searchParams.get("email") || "",
      generateOtp: searchParams.get("generate") === "1" || false,
    };
  }, [searchParams]);

  // Redirect if no email is provided
  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email, navigate]);

  // Countdown timer for resend functionality
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCountdown > 0) {
      timer = setTimeout(() => {
        setResendCountdown(resendCountdown - 1);
      }, 1000);
    } else {
      setResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  const handleVerifySubmit = async (
    values: VerificationFormValues,
    { setSubmitting }: FormikHelpers<VerificationFormValues>
  ) => {
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      // Call your verification API here
      const response = await authService.verifyEmail({ email, otp: values.otp });

      if (response.success) {
        setSuccessMessage("Email verified successfully! Redirecting in a moment.");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setErrorMessage(response.message || "Verification failed. Please try again.");
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      setErrorMessage(`Verification failed: ${errorMessage}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleResendOTP = useCallback(async () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setResendDisabled(true);
    setResendCountdown(60); // 60 second countdown

    try {
      // Call your resend OTP API here
      const response = await authService.resendOTP({ email, purpose: OtpPurpose.REGISTRATION });

      if (!response.success) {
        setErrorMessage(response.message || "Failed to resend verification code.");
        setResendDisabled(false);
        setResendCountdown(0);
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      setErrorMessage(`Failed to resend code: ${errorMessage}`);
      setResendDisabled(false);
      setResendCountdown(0);
    }
  }, [email]);

  useEffect(() => {
    if (generateOtp) {
      handleResendOTP();
      // Remove generate=1 parameter from URL without reloading the page
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("generate");
      window.history.replaceState({ path: newUrl.href }, "", newUrl.href);
    }
  }, [generateOtp, handleResendOTP]);

  const formik = useFormik({
    initialValues: { otp: "" },
    validate: validateVerificationForm,
    onSubmit: handleVerifySubmit,
  });

  if (!email) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-dvh bg-white dark:bg-gray-900 relative pt-16">
      <div className="p-8 max-w-sm flex flex-col gap-2 mx-auto">
        <div className="my-0">
          <AppLogo size={Size.lg} className="mb-8" />
          <div className="text-center text-2xl sm:text-3xl text-black/70 dark:text-white/70 select-none">
            Verify your email
          </div>
        </div>

        {errorMessage && (
          <Notification type={NotificationType.ERROR} className="my-4">
            {errorMessage}
          </Notification>
        )}
        {successMessage && (
          <Notification type={NotificationType.SUCCESS} className="my-4">
            {successMessage}
          </Notification>
        )}

        <VerificationForm
          values={formik.values}
          errors={formik.errors}
          touched={formik.touched}
          isSubmitting={formik.isSubmitting}
          handleSubmit={formik.handleSubmit}
          setFieldValue={formik.setFieldValue}
          email={email}
          onResendOTP={handleResendOTP}
          resendDisabled={resendDisabled}
          resendCountdown={resendCountdown}
          disableForm={!!successMessage}
        />
      </div>

      {/* Fixed dark mode toggle at bottom right */}
      <div className="fixed bottom-6 right-6 z-50">
        <DarkModeToggle withBackground={true} />
      </div>
    </div>
  );
}

export default VerifyEmail;
