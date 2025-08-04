import React, { useMemo } from "react";
import { Icons } from "../components/Icon/IconMap";
import SettingsSection from "../sections/SettingsSection/SettingsSection";
import AccountSettingsSection from "../sections/AccountSettingsSection/AccountSettingsSection";
import AppearanceSettingsSection from "../sections/AppearanceSettingsSection/AppearanceSettingsSection";
import TaskPreferencesSection from "../sections/TaskPreferencesSection/TaskPreferencesSection";
import NotificationSettingsSection from "../sections/NotificationSettingsSection/NotificationSettingsSection";
import DataPrivacySection from "../sections/DataPrivacySection/DataPrivacySection";

interface SettingsSectionConfig {
  id: string;
  title: string;
  description: string;
  icon: Icons;
  component: React.ComponentType;
}

const Settings: React.FC = () => {
  const settingsSections: SettingsSectionConfig[] = useMemo(
    () => [
      {
        id: "account",
        title: "Account & Profile",
        description: "Manage your account information and security",
        icon: Icons.account,
        component: AccountSettingsSection,
      },
      {
        id: "appearance",
        title: "Appearance",
        description: "Customize the look and feel of your app",
        icon: Icons.settings,
        component: AppearanceSettingsSection,
      },
      {
        id: "tasks",
        title: "Task Preferences",
        description: "Set default options for your tasks",
        icon: Icons.task,
        component: TaskPreferencesSection,
      },
      {
        id: "notifications",
        title: "Notifications",
        description: "Control how you receive updates",
        icon: Icons.notification,
        component: NotificationSettingsSection,
      },
      {
        id: "data",
        title: "Data & Privacy",
        description: "Manage your data and privacy settings",
        icon: Icons.document,
        component: DataPrivacySection,
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-br pt-6 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">Settings</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">Customize your Ticked experience</p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-8">
          {settingsSections.map((section) => {
            const SectionComponent = section.component;
            return (
              <SettingsSection
                key={section.id}
                title={section.title}
                description={section.description}
                icon={section.icon}
              >
                <SectionComponent />
              </SettingsSection>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-sm text-gray-500 dark:text-gray-400">
          <p>Ticked Task Management App • Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
