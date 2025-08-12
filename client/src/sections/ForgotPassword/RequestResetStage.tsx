import { Input, InputTypes } from "../../components/Input";
import { Button } from "../../components/Button";
import { ButtonType } from "../../components/Button/Button.enum";
import { Size } from "../../utils/enums";

type Props = {
  email: string;
  setEmail: (v: string) => void;
  emailTouched: boolean;
  setEmailTouched: (v: boolean) => void;
  isSubmitting: boolean;
  onSubmit: () => void;
  onBackToLogin: () => void;
  validateEmail: () => string | null;
};

export const RequestResetStage = ({
  email,
  setEmail,
  emailTouched,
  setEmailTouched,
  isSubmitting,
  onSubmit,
  onBackToLogin,
  validateEmail,
}: Props) => {
  const emailError = emailTouched ? validateEmail() : undefined;
  return (
    <>
      <Input
        label="Email"
        name="email"
        type={InputTypes.email}
        placeholder="Enter email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => setEmailTouched(true)}
        disabled={isSubmitting}
        errorMessage={emailError || undefined}
      />
      <Button onClick={onSubmit} isLoading={isSubmitting} className="mt-2">
        Send Reset Code
      </Button>

      <div className="flex justify-center items-center text-sm">
        <span className="text-zinc-700 dark:text-gray-300 select-none">Remember your password?</span>
        <Button
          size={Size.sm}
          type={ButtonType.link}
          onClick={onBackToLogin}
          className="ps-1 pe-1"
          disabled={isSubmitting}
        >
          Sign in
        </Button>
      </div>
    </>
  );
};
