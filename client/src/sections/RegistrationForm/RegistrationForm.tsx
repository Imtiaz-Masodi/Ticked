import { Button } from "../../components/Button";
import { Input, InputTypes } from "../../components/Input";
import { RegistrationFormProps } from "./RegistrationForm.types";

export function RegistrationForm(props: RegistrationFormProps) {
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
        name="name"
        label="Name"
        value={values?.name}
        type={InputTypes.text}
        placeholder="Enter name"
        onChange={handleChange}
        onBlur={handleBlur}
        errorMessage={touched.name ? errors.name : undefined}
        disabled={isSubmitting}
      />
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
      <Input
        name="retypePassword"
        label="Re-type Password"
        value={values?.retypePassword}
        type={InputTypes.password}
        placeholder="Enter password again"
        onChange={handleChange}
        onBlur={handleBlur}
        errorMessage={
          touched.retypePassword ? errors.retypePassword : undefined
        }
        disabled={isSubmitting}
      />

      <Button onClick={handleSubmit} isLoading={isSubmitting} className="mt-4">
        Create Account
      </Button>
    </>
  );
}
