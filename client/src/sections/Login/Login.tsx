import { Input, InputTypes } from "../../components/Input";
import { Button } from "../../components/Button";
import { ButtonType } from "../../components/Button/Button.enum";
import { Size } from "../../utils/enums";
import { Checkbox } from "../../components/Checkbox";

const Login = () => {
  return (
    <div className="mt-16 p-8 max-w-screen-sm flex flex-col gap-2 mx-auto">
      <Input name="email" label="Email" type={InputTypes.email} placeholder="Enter email address" onChange={() => {}} />
      <Input
        name="password"
        label="Password"
        type={InputTypes.password}
        placeholder="Enter password"
        onChange={() => {}}
      />

      <div className="flex justify-between items-center text-sm">
        <Checkbox name="rememberMe" label="Remember Me" disabled={false} size={Size.sm} />
        <Button size={Size.sm} type={ButtonType.link} onClick={() => {}}>
          Forgot Password
        </Button>
      </div>

      <Button className="" onClick={() => {}}>
        Submit
      </Button>

      <div className="flex justify-center items-center text-sm">
        <span>Dont' have an account? </span>
        <Button size={Size.sm} type={ButtonType.link} onClick={() => {}}>
          Sign up
        </Button>
      </div>
    </div>
  );
};

export default Login;
