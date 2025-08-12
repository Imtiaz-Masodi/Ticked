import React, { useState } from "react";
import { Button } from "../../components/Button";
import { ButtonType, ButtonVariant } from "../../components/Button/Button.enum";
import { ApiResponseStatus, Size } from "../../utils/enums";
import { Input } from "../../components/Input";
import { SettingItem } from "../../components/SettingItem";
import { Icon } from "../../components/Icon";
import { Icons } from "../../components/Icon/IconMap";
import { useApiToast } from "../../utils/toastUtils";
import { useLogout } from "../../hooks";
import { useUpdatePasswordMutation } from "../../store/api/accountApi";
import { Notification, NotificationType } from "../../components/Notification";
import { UpdatePasswordRequestType } from "../../types/UpdatePasswordRequestType";

const AccountSettingsSection: React.FC = () => {
  const toast = useApiToast();
  const logout = useLogout();
  const [updatePassword, { isLoading: isUpdatingPassword }] = useUpdatePasswordMutation();

  // Password change state
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordForm, setPasswordForm] = useState<UpdatePasswordRequestType>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<UpdatePasswordRequestType>>({});
  const [errorMessage, setErrorMessage] = useState<string>("");

  const validatePasswordForm = () => {
    const newErrors: typeof errors = {};

    if (!passwordForm.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }
    if (!passwordForm.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (passwordForm.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters long";
    } else if (passwordForm.newPassword.length > 18) {
      newErrors.newPassword = "Password must be at most 18 characters long";
    }

    if (!passwordForm.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordChange = async () => {
    setErrorMessage("");
    // Validate the form
    if (!validatePasswordForm()) {
      return;
    }

    try {
      const result = await updatePassword(passwordForm);

      if (result.data?.status === ApiResponseStatus.success) {
        toast.apiSuccess(result.data?.message || "Password updated successfully");
        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
        setErrors({});

        setTimeout(() => {
          setShowPasswordChange(false);
        }, 1000);
      } else if (result.data?.status === ApiResponseStatus.failed) {
        setErrorMessage(result.data?.message || "Failed to update password");
      } else if ("error" in result || !result.data?.status) {
        // Handle RTK Query error
        const errorData = result.error as { data?: { message?: string } };
        const errorMessage = errorData?.data?.message || "Failed to update password";
        setErrorMessage(errorMessage);
      }
    } catch {
      setErrorMessage("An unexpected error occurred");
    }
  };

  const handleLogout = () => logout();

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      toast.apiSuccess("Account deletion functionality coming soon!");
    }
  };

  return (
    <>
      {!showPasswordChange ? (
        <>
          <SettingItem
            label="Change Password"
            description="Update your account password for security"
            control={
              <Button type={ButtonType.outline} size={Size.sm} onClick={() => setShowPasswordChange(true)}>
                Change
              </Button>
            }
          />

          <SettingItem
            label="Logout"
            description="Sign out of your account"
            control={
              <Button type={ButtonType.outline} variant={ButtonVariant.secondary} size={Size.sm} onClick={handleLogout}>
                Logout
              </Button>
            }
          />

          <SettingItem
            label="Delete Account"
            description="Permanently delete your account and all data"
            control={
              <Button
                type={ButtonType.outline}
                variant={ButtonVariant.danger}
                size={Size.sm}
                onClick={handleDeleteAccount}
              >
                Delete
              </Button>
            }
            danger={true}
          />
        </>
      ) : (
        <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">Change Password</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Update your account password for security</p>
            </div>
            <div
              onClick={() => {
                setShowPasswordChange(false);
                setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
                setErrors({});
              }}
              className="w-8 h-8 rounded-lg bg-white/80 dark:bg-gray-700/80 border border-gray-300 dark:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors cursor-pointer flex items-center justify-center"
            >
              <Icon name={Icons.close} className="text-gray-600 dark:text-gray-300" />
            </div>
          </div>

          {errorMessage && <Notification type={NotificationType.ERROR}>{errorMessage}</Notification>}

          <Input
            label="Current Password"
            type="password"
            value={passwordForm.currentPassword}
            onChange={(e) => {
              setPasswordForm((prev) => ({ ...prev, currentPassword: e.target.value }));
              // Clear error when user starts typing
              if (errors.currentPassword) {
                setErrors((prev) => ({ ...prev, currentPassword: undefined }));
              }
            }}
            placeholder="Enter current password"
            errorMessage={errors.currentPassword}
            disabled={isUpdatingPassword}
          />
          <Input
            label="New Password"
            type="password"
            value={passwordForm.newPassword}
            onChange={(e) => {
              setPasswordForm((prev) => ({ ...prev, newPassword: e.target.value }));
              // Clear error when user starts typing
              if (errors.newPassword) {
                setErrors((prev) => ({ ...prev, newPassword: undefined }));
              }
            }}
            placeholder="Enter new password"
            errorMessage={errors.newPassword}
            disabled={isUpdatingPassword}
          />
          <Input
            label="Confirm New Password"
            type="password"
            value={passwordForm.confirmPassword}
            onChange={(e) => {
              setPasswordForm((prev) => ({ ...prev, confirmPassword: e.target.value }));
              // Clear error when user starts typing
              if (errors.confirmPassword) {
                setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
              }
            }}
            placeholder="Confirm new password"
            errorMessage={errors.confirmPassword}
            disabled={isUpdatingPassword}
          />
          <Button
            type={ButtonType.solid}
            variant={ButtonVariant.primary}
            size={Size.md}
            onClick={handlePasswordChange}
            className="w-full !mt-6 py-3"
            isLoading={isUpdatingPassword}
            disabled={isUpdatingPassword}
          >
            Update Password
          </Button>
        </div>
      )}
    </>
  );
};

export default AccountSettingsSection;
