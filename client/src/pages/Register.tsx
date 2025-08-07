import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormikHelpers, useFormik } from "formik";

import { AppLogo } from "../components/AppLogo";
import { Notification, NotificationType } from "../components/Notification";
import { RegistrationFormValues } from "../sections/RegistrationForm/RegistrationForm.types";
import { validateRegistrationForm } from "../sections/RegistrationForm/RegistrationForm.helper";
import { RegistrationForm } from "../sections/RegistrationForm/RegistrationForm";
import { Button } from "../components/Button";
import { Size } from "../utils/enums";
import { ButtonType } from "../components/Button/Button.enum";
import { authService } from "../api/authService";
import { ERROR_REGISTRATION_FAILED } from "../utils/constants";
import { DarkModeToggle } from "../components/DarkModeToggle";

function Register() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (
    values: RegistrationFormValues,
    { setSubmitting }: FormikHelpers<RegistrationFormValues>
  ) => {
    setErrorMessage(null);

    try {
      const response = await authService.register(values);
      if (response.success) {
        // Redirect to email verification page with the email as a query parameter
        navigate(`/verify-email?email=${encodeURIComponent(values.email)}`);
      } else {
        setErrorMessage(response.message || ERROR_REGISTRATION_FAILED);
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      setErrorMessage(`${ERROR_REGISTRATION_FAILED} ${errorMessage}`);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "", retypePassword: "" },
    validate: validateRegistrationForm,
    onSubmit: handleSubmit,
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 relative pt-16">
      <div className="p-8 max-w-sm flex flex-col gap-2 mx-auto">
        <div className="my-4">
          <AppLogo size={Size.lg} className="mb-8" />
          <div className="text-center text-2xl sm:text-3xl text-black/70 dark:text-white/70 select-none">
            Don't have an account?
          </div>
          <div className="text-center text-sm text-zinc-400 dark:text-gray-500 font-light select-none">
            Create your account. It's free and only takes a minute.
          </div>
        </div>

        {errorMessage && <Notification type={NotificationType.ERROR}>{errorMessage}</Notification>}

        <RegistrationForm {...formik} />

        <div className="flex justify-center items-center text-sm">
          <span className="text-zinc-700 dark:text-gray-300 select-none">Have an account?</span>
          <Button
            size={Size.sm}
            type={ButtonType.link}
            onClick={() => navigate("/login")}
            className="ps-1 pe-1"
            disabled={formik.isSubmitting}
          >
            Sign in
          </Button>
        </div>
      </div>

      {/* Fixed dark mode toggle at bottom right */}
      <div className="fixed bottom-6 right-6 z-50">
        <DarkModeToggle withBackground={true} />
      </div>
    </div>
  );
}

export default Register;
