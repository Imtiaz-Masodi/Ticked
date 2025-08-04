import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { ButtonType, ButtonVariant } from "../../components/Button/Button.enum";
import { Size } from "../../utils/enums";
import { Input } from "../../components/Input";
import { SettingItem } from "../../components/SettingItem";
import { Icon } from "../../components/Icon";
import { Icons } from "../../components/Icon/IconMap";
import { authHelper } from "../../helpers/authHelper";
import { useApiToast } from "../../utils/toastUtils";

const AccountSettingsSection: React.FC = () => {
  const navigate = useNavigate();
  const toast = useApiToast();

  // Password change state
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = () => {
    // TODO: Implement password change API call
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.apiError("New passwords don't match");
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      toast.apiError("Password must be at least 8 characters long");
      return;
    }

    toast.apiSuccess("Password change functionality coming soon!");
    setShowPasswordChange(false);
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handleLogout = () => {
    authHelper.removeUserToken();
    navigate("/login");
  };

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
              }}
              className="w-8 h-8 rounded-lg bg-white/80 dark:bg-gray-700/80 border border-gray-300 dark:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors cursor-pointer flex items-center justify-center"
            >
              <Icon name={Icons.close} className="text-gray-600 dark:text-gray-300" />
            </div>
          </div>

          <Input
            label="Current Password"
            type="password"
            value={passwordForm.currentPassword}
            onChange={(e) => setPasswordForm((prev) => ({ ...prev, currentPassword: e.target.value }))}
            placeholder="Enter current password"
          />
          <Input
            label="New Password"
            type="password"
            value={passwordForm.newPassword}
            onChange={(e) => setPasswordForm((prev) => ({ ...prev, newPassword: e.target.value }))}
            placeholder="Enter new password"
          />
          <Input
            label="Confirm New Password"
            type="password"
            value={passwordForm.confirmPassword}
            onChange={(e) => setPasswordForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
            placeholder="Confirm new password"
          />
          <Button
            type={ButtonType.solid}
            variant={ButtonVariant.primary}
            size={Size.md}
            onClick={handlePasswordChange}
            className="w-full !mt-6 py-3"
          >
            Update Password
          </Button>
        </div>
      )}
    </>
  );
};

export default AccountSettingsSection;
