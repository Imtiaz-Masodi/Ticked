import { useState } from "react";
import { FormikHelpers, useFormik } from "formik";
import { Button } from "../../components/Button";
import { ButtonType } from "../../components/Button/Button.enum";
import { Size } from "../../utils/enums";
import { LoginForm } from "./LoginForm";
import { LoginFormValues } from "./Login.types";
import { validateForm } from "./Login.helper";
import { authService } from "../../api/authService";
import { ERROR_LOGIN_FAILED } from "../../utils/constants";
import { Notification, NotificationType } from "../../components/Notification";
import { AppLogo } from "../../components/AppLogo";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>
  ) => {
    setErrorMessage(null);

    try {
      const response = await authService.login(values);
      if (response.success) {
        // ToDo: Redirect to home page
        alert("Login success");
      } else {
        setErrorMessage(response.message || ERROR_LOGIN_FAILED);
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      setErrorMessage(`${ERROR_LOGIN_FAILED} ${errorMessage}`);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: { email: "", password: "", rememberMe: false },
    onSubmit: handleSubmit,
    validate: validateForm,
  });

  return (
    <div className="mt-16 p-8 max-w-sm flex flex-col gap-2 mx-auto">
      <div className="my-4">
        <div className="mb-8">
          <AppLogo />
        </div>
        <div className="text-center text-2xl font-thin sm:text-3xl">
          Log in to your account
        </div>
        <div className="text-center text-sm text-gray-500 font-thin">
          Welcome back! Please enter your details
        </div>
      </div>

      {errorMessage && (
        <Notification type={NotificationType.ERROR}>
          {errorMessage}
        </Notification>
      )}

      <LoginForm {...formik} />

      <div className="flex justify-center items-center text-sm">
        <span>Don't have an account?</span>
        <Button
          size={Size.sm}
          type={ButtonType.link}
          onClick={() => {}}
          className="ps-1 pe-1"
          disabled={formik.isSubmitting}
        >
          Sign up
        </Button>
      </div>
    </div>
  );
};

export default Login;
