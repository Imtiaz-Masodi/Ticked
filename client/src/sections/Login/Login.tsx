import { useFormik } from "formik";
import { Button } from "../../components/Button";
import { ButtonType } from "../../components/Button/Button.enum";
import { Size } from "../../utils/enums";
import { LoginForm } from "./LoginForm";
import { LoginFormValues } from "./Login.types";
import { validateForm } from "./Login.helper";

const Login = () => {
  const handleSubmit = (values: LoginFormValues) => {
    console.log("Submitting: ", values);
    // ToDo: Add login logic here
  };

  const formik = useFormik({
    initialValues: { email: "", password: "", rememberMe: false },
    onSubmit: handleSubmit,
    validate: validateForm,
  });

  return (
    <div className="mt-16 p-8 max-w-sm flex flex-col gap-2 mx-auto">
      <div className="my-4">
        <div className="text-center text-2xl font-thin sm:text-3xl">
          Log in to your account
        </div>
        <div className="text-center text-sm text-gray-500 font-thin">
          Welcome back! Please enter your details
        </div>
      </div>

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
