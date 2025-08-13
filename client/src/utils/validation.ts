import { UpdateProfileRequestType } from "../types/UpdateProfileRequestType";

export function validateProfileForm(values: UpdateProfileRequestType) {
  const errors: Partial<UpdateProfileRequestType> = {};

  if (values.name && values.name.trim().length < 3) {
    errors.name = "Name must be at least 3 characters long";
  }

  if (values.bio && values.bio.length > 500) {
    errors.bio = "Bio cannot be more than 500 characters";
  }

  if (values.location && values.location.length > 100) {
    errors.location = "Location cannot be more than 100 characters";
  }

  return errors;
}
