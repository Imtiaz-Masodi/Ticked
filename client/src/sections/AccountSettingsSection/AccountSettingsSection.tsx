import React from "react";
import { Button } from "../../components/Button";
import { ButtonType, ButtonVariant } from "../../components/Button/Button.enum";
import { Size } from "../../utils/enums";
import { SettingItem } from "../../components/SettingItem";
import { useApiToast } from "../../utils/toastUtils";
import { useLogout } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../utils/routes";

const AccountSettingsSection: React.FC = () => {
  const navigate = useNavigate();
  const toast = useApiToast();
  const logout = useLogout();
  const handleLogout = () => logout();

  const handleChangePassword = () => {
    navigate(`${APP_ROUTES.PROFILE}?update-password=1`);
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      toast.apiSuccess("Account deletion functionality coming soon!");
    }
  };

  return (
    <>
      <SettingItem
        label="Change Password"
        description="Update your account password for security"
        control={
          <Button type={ButtonType.outline} size={Size.sm} onClick={() => handleChangePassword()}>
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
          <Button type={ButtonType.outline} variant={ButtonVariant.danger} size={Size.sm} onClick={handleDeleteAccount}>
            Delete
          </Button>
        }
        danger={true}
      />
    </>
  );
};

export default AccountSettingsSection;
