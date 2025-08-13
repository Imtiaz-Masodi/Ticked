export type User = {
  _id: string;
  name: string;
  email: string;
  bio?: string;
  location?: string;
  dateOfBirth?: Date;
  createdOn: Date;
  accountVerified: boolean;
  accountDeactivated: boolean;
};
