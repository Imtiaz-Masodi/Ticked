import { Input, InputTypes } from "../../components/Input";
import { Button } from "../../components/Button";
import { ButtonType } from "../../components/Button/Button.enum";
import { Size } from "../../utils/enums";

type Props = {
  newPassword: string;
  retypePassword: string;
  setNewPassword: (v: string) => void;
  setRetypePassword: (v: string) => void;
  isSubmitting: boolean;
  onReset: () => void;
  onBackToLogin: () => void;
  passwordError: string | undefined;
};

export const ResetPasswordStage = ({
  newPassword,
  retypePassword,
  setNewPassword,
  setRetypePassword,
  isSubmitting,
  onReset,
  onBackToLogin,
  passwordError,
}: Props) => {
  return (
    <>
      <Input
        label="New Password"
        name="newPassword"
        type={InputTypes.password}
        placeholder="Enter new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        disabled={isSubmitting}
      />
      <Input
        label="Retype New Password"
        name="retypePassword"
        type={InputTypes.password}
        placeholder="Retype new password"
        value={retypePassword}
        onChange={(e) => setRetypePassword(e.target.value)}
        disabled={isSubmitting}
        errorMessage={passwordError}
      />
      <Button onClick={onReset} isLoading={isSubmitting} className="mt-4">
        Reset Password
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
