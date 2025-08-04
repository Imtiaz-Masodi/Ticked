import React from "react";
import { DarkModeToggle } from "../../components/DarkModeToggle";
import { SettingItem } from "../../components/SettingItem";

const AppearanceSettingsSection: React.FC = () => {
  return (
    <SettingItem label="Dark Mode" description="Toggle between light and dark theme" control={<DarkModeToggle />} />
  );
};

export default AppearanceSettingsSection;
