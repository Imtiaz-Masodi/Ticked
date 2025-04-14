import { User } from "./User";

export type RegistrationResponseType = {
  user: User;
  authToken: string;
};
