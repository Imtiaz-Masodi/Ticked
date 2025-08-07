import { User } from "./User";

export type AccountVerificationResponseType = {
  user: User;
  authToken: string;
};
