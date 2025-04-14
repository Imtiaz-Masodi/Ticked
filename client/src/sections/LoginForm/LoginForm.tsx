import { Button } from "../../components/Button";
import { ButtonType } from "../../components/Button/Button.enum";
import { Checkbox } from "../../components/Checkbox";
import { Input, InputTypes } from "../../components/Input";
import { Size } from "../../utils/enums";
import { LoginFormProps } from "./LoginForm.types";

export function LoginForm(props: LoginFormProps) {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;

  return (
    <>
      <Input
        name="email"
        label="Email"
        value={values?.email}
        type={InputTypes.email}
        placeholder="Enter email address"
        onChange={handleChange}
        onBlur={handleBlur}
        errorMessage={touched.email ? errors.email : undefined}
        disabled={isSubmitting}
      />
      <Input
        name="password"
        label="Password"
        value={values?.password}
        type={InputTypes.password}
        placeholder="Enter password"
        onChange={handleChange}
        onBlur={handleBlur}
        errorMessage={touched.password ? errors.password : undefined}
        disabled={isSubmitting}
      />

      <div className="flex justify-between items-center text-sm">
        <Checkbox
          name="rememberMe"
          label="Remember Me"
          checked={values?.rememberMe}
          disabled={isSubmitting}
          checkboxSize={Size.sm}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Button
          size={Size.sm}
          type={ButtonType.link}
          onClick={() => {}}
          className="ps-0 pe-0"
          disabled={isSubmitting}
        >
          Forgot Password
        </Button>
      </div>

      <Button onClick={handleSubmit} isLoading={isSubmitting}>
        Sign In
      </Button>
    </>
  );
}
