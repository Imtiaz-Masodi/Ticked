import { useState, useEffect } from "react";
import { FormikHelpers, useFormik } from "formik";
import { Button } from "../components/Button";
import { ButtonType } from "../components/Button/Button.enum";
import { Size } from "../utils/enums";
import { authService } from "../api/authService";
import { ERROR_LOGIN_FAILED } from "../utils/constants";
import { Notification, NotificationType } from "../components/Notification";
import { AppLogo } from "../components/AppLogo";
import { LoginForm, validateForm, LoginFormValues } from "../sections/LoginForm";
import { useNavigate } from "react-router-dom";
import { authHelper } from "../helpers/authHelper";

const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Check if user is already logged in on component mount
  useEffect(() => {
    if (authHelper.isUserLoggedIn()) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (values: LoginFormValues, { setSubmitting }: FormikHelpers<LoginFormValues>) => {
    setErrorMessage(null);

    try {
      const response = await authService.login(values);
      if (response.success) {
        navigate("/");
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
        <AppLogo size={Size.lg} className="mb-8" />
        <div className="text-center text-2xl sm:text-3xl text-black/70">Log in to your account</div>
        <div className="text-center text-sm text-zinc-400 font-light">Welcome back! Please enter your details</div>
      </div>

      {errorMessage && <Notification type={NotificationType.ERROR}>{errorMessage}</Notification>}

      <LoginForm {...formik} />

      <div className="flex justify-center items-center text-sm">
        <span className="text-zinc-700">Don't have an account?</span>
        <Button
          size={Size.sm}
          type={ButtonType.link}
          onClick={() => navigate("/register")}
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
