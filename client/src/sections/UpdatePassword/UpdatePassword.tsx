import React, { useState, useRef, useEffect } from "react";
import { useUpdatePasswordMutation } from "../../store/api/accountApi";
import { Button } from "../../components/Button";
import { ButtonType, ButtonVariant } from "../../components/Button/Button.enum";
import { Input } from "../../components/Input";
import { ApiResponseStatus, Size } from "../../utils/enums";
import { Icons } from "../../components/Icon/IconMap";
import { UpdatePasswordRequestType } from "../../types/UpdatePasswordRequestType";
import { useToast } from "../../hooks";
import { NotificationType, Notification } from "../../components/Notification";
import { User } from "../../types/User";

interface UpdatePasswordProps {
  user: User;
  showUpdateForm?: boolean;
}

export const UpdatePassword: React.FC<UpdatePasswordProps> = ({ user, showUpdateForm = false }) => {
  const { showToast } = useToast();
  const formRef = useRef<HTMLDivElement>(null);

  // Password change state
  const [showPasswordChange, setShowPasswordChange] = useState(showUpdateForm);
  const [updatePassword, { isLoading: isUpdatingPassword }] = useUpdatePasswordMutation();
  const [passwordForm, setPasswordForm] = useState<UpdatePasswordRequestType>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState<Partial<UpdatePasswordRequestType>>({});
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");

  // Scroll password form into view
  useEffect(() => {
    if (showPasswordChange && formRef.current) {
      formRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }, [showPasswordChange, showUpdateForm]);

  const validatePasswordForm = () => {
    const newErrors: Partial<UpdatePasswordRequestType> = {};

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

    setPasswordErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordChange = async () => {
    setPasswordErrorMessage("");

    if (!validatePasswordForm()) {
      return;
    }

    try {
      const result = await updatePassword(passwordForm);

      if (result.data?.status === ApiResponseStatus.success) {
        showToast(result.data?.message || "Password updated successfully!", {
          type: NotificationType.SUCCESS,
          title: "Success",
        });
        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
        setPasswordErrors({});

        setTimeout(() => {
          setShowPasswordChange(false);
        }, 1000);
      } else if (result.data?.status === ApiResponseStatus.failed) {
        setPasswordErrorMessage(result.data?.message || "Failed to update password");
      } else if ("error" in result || !result.data?.status) {
        const errorData = result.error as { data?: { message?: string } };
        const errorMessage = errorData?.data?.message || "Failed to update password";
        setPasswordErrorMessage(errorMessage);
      }
    } catch {
      setPasswordErrorMessage("An unexpected error occurred");
    }
  };

  const handlePasswordCancel = () => {
    setShowPasswordChange(false);
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setPasswordErrors({});
    setPasswordErrorMessage("");
  };

  return (
    <div
      ref={formRef}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mt-6"
    >
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Security</h3>
      </div>
      <div className="p-6">
        {!showPasswordChange ? (
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100">Password</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Last updated: {new Date(user.createdOn).toLocaleDateString()}
              </p>
            </div>
            <Button
              variant={ButtonVariant.secondary}
              type={ButtonType.outline}
              onClick={() => setShowPasswordChange(true)}
              startIcon={Icons.edit}
              size={Size.sm}
            >
              Change Password
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100">Change Password</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Update your account password for security</p>
            </div>

            {passwordErrorMessage && <Notification type={NotificationType.ERROR}>{passwordErrorMessage}</Notification>}

            <Input
              label="Current Password"
              type="password"
              value={passwordForm.currentPassword}
              onChange={(e) => {
                setPasswordForm((prev) => ({ ...prev, currentPassword: e.target.value }));
                if (passwordErrors.currentPassword) {
                  setPasswordErrors((prev) => ({ ...prev, currentPassword: undefined }));
                }
              }}
              placeholder="Enter current password"
              errorMessage={passwordErrors.currentPassword}
              disabled={isUpdatingPassword}
            />

            <Input
              label="New Password"
              type="password"
              value={passwordForm.newPassword}
              onChange={(e) => {
                setPasswordForm((prev) => ({ ...prev, newPassword: e.target.value }));
                if (passwordErrors.newPassword) {
                  setPasswordErrors((prev) => ({ ...prev, newPassword: undefined }));
                }
              }}
              placeholder="Enter new password"
              errorMessage={passwordErrors.newPassword}
              disabled={isUpdatingPassword}
            />

            <Input
              label="Confirm New Password"
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) => {
                setPasswordForm((prev) => ({ ...prev, confirmPassword: e.target.value }));
                if (passwordErrors.confirmPassword) {
                  setPasswordErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                }
              }}
              placeholder="Confirm new password"
              errorMessage={passwordErrors.confirmPassword}
              disabled={isUpdatingPassword}
            />

            <div className="flex gap-4 !mt-6">
              <Button
                variant={ButtonVariant.secondary}
                type={ButtonType.outline}
                onClick={handlePasswordCancel}
                size={Size.sm}
                disabled={isUpdatingPassword}
              >
                Cancel
              </Button>
              <Button
                variant={ButtonVariant.primary}
                onClick={handlePasswordChange}
                size={Size.sm}
                isLoading={isUpdatingPassword}
                disabled={isUpdatingPassword}
              >
                Update Password
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
