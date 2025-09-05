import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useUpdateProfileMutation } from "../../store/api/accountApi";
import { Button } from "../Button";
import { ButtonType, ButtonVariant } from "../Button/Button.enum";
import { Input } from "../Input";
import { TextArea } from "../TextArea";
import { ApiResponseStatus, Size } from "../../utils/enums";
import { Icons } from "../Icon/IconMap";
import { UpdateProfileRequestType } from "../../types/UpdateProfileRequestType";
import { useToast } from "../../hooks";
import { formatDateToISOString } from "../../helpers/dateHelper";
import { validateProfileForm } from "../../utils/validation";

interface User {
  name?: string;
  email: string;
  createdOn: Date;
  bio?: string;
  location?: string;
  dateOfBirth?: Date;
}

interface ProfileFormProps {
  user: User;
}

type ProfileFormValues = UpdateProfileRequestType;

export const ProfileForm: React.FC<ProfileFormProps> = ({ user }) => {
  const { successToast, errorToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const formik = useFormik<ProfileFormValues>({
    initialValues: {
      name: "",
      bio: "",
      location: "",
      dateOfBirth: "",
    },
    validate: validateProfileForm,
    onSubmit: async (values) => {
      try {
        // Remove empty strings to avoid sending unnecessary data
        const cleanValues = Object.entries(values).reduce((acc, [key, value]) => {
          if (value !== "" && value !== null && value !== undefined) {
            acc[key as keyof ProfileFormValues] = value;
          }
          return acc;
        }, {} as ProfileFormValues);

        const response = await updateProfile(cleanValues).unwrap();

        if (response.status === ApiResponseStatus.success) {
          successToast("Profile updated successfully!");
          setIsEditing(false);
        } else {
          errorToast("Failed to update profile");
        }
      } catch (error: unknown) {
        const errorMessage = (error as { data?: { message?: string } })?.data?.message || "Failed to update profile";
        errorToast(errorMessage);
      }
    },
  });

  // Update form values when user data loads
  useEffect(() => {
    if (user) {
      formik.setValues({
        name: user.name || "",
        bio: user.bio || "",
        location: user.location || "",
        dateOfBirth: formatDateToISOString(user.dateOfBirth) || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleCancel = () => {
    if (user) {
      formik.setValues({
        name: user.name || "",
        bio: user.bio || "",
        location: user.location || "",
        dateOfBirth: formatDateToISOString(user.dateOfBirth) || "",
      });
    }
    setIsEditing(false);
  };

  const handleEditToggle = () => {
    setIsEditing(true);
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        {/* Form Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Personal Information</h3>
            {!isEditing ? (
              <Button variant={ButtonVariant.primary} onClick={handleEditToggle} startIcon={Icons.edit} size={Size.sm}>
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  variant={ButtonVariant.secondary}
                  type={ButtonType.outline}
                  onClick={handleCancel}
                  size={Size.sm}
                  disabled={isUpdating}
                >
                  Cancel
                </Button>
                <Button
                  variant={ButtonVariant.primary}
                  onClick={formik.handleSubmit}
                  size={Size.sm}
                  isLoading={isUpdating}
                  disabled={!formik.isValid}
                >
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <Input
                name="name"
                label="Full Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorMessage={formik.touched.name ? formik.errors.name : undefined}
                disabled={!isEditing}
                placeholder="Enter your full name"
              />
            </div>

            {/* Bio */}
            <div>
              <TextArea
                name="bio"
                label="Bio"
                value={formik.values.bio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorMessage={formik.touched.bio ? formik.errors.bio : undefined}
                disabled={!isEditing}
                placeholder="Tell us about yourself..."
                maxLength={500}
                rows={4}
              />
            </div>

            {/* Location */}
            <div>
              <Input
                name="location"
                label="Location"
                value={formik.values.location}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorMessage={formik.touched.location ? formik.errors.location : undefined}
                disabled={!isEditing}
                placeholder="City, Country"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <Input
                name="dateOfBirth"
                type="date"
                label="Date of Birth"
                value={formik.values.dateOfBirth}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorMessage={formik.touched.dateOfBirth ? formik.errors.dateOfBirth : undefined}
                disabled={!isEditing}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
