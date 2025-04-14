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
        // ToDo: Save user info to redux store
        navigate("/");
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
    <div className="mt-16 p-8 max-w-sm flex flex-col gap-2 mx-auto">
      <div className="my-4">
        <AppLogo className="mb-8" />
        <div className="text-center text-2xl font-thin sm:text-3xl">
          Don't have an account?
        </div>
        <div className="text-center text-sm text-gray-500 font-thin">
          Create your account. It's free and only takes a minute.
        </div>
      </div>

      {errorMessage && (
        <Notification type={NotificationType.ERROR}>
          {errorMessage}
        </Notification>
      )}

      <RegistrationForm {...formik} />

      <div className="flex justify-center items-center text-sm">
        <span>Have an account?</span>
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
  );
}

export default Register;
