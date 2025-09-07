import React, { useState } from "react";
import { Dropdown } from "../../components/Dropdown";
import { Toggle } from "../../components/Toggle";
import { SettingItem } from "../../components/SettingItem";
import { Size } from "../../utils/enums";

const NotificationSettingsSection: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [sessionDuration, setSessionDuration] = useState("5 days");

  return (
    <>
      <SettingItem
        label="Browser Notifications"
        description="Receive notifications for due tasks and reminders"
        control={
          <Toggle checked={notificationsEnabled} onChange={setNotificationsEnabled} variant="success" size={Size.md} />
        }
      />

      <SettingItem
        label="Session Duration"
        description="How long to stay logged in"
        control={
          <Dropdown
            name="sessionDuration"
            options={["1 day", "5 days", "30 days", "Never expire"]}
            value={sessionDuration}
            getLabel={(option) => option}
            onChange={(_, selected) => setSessionDuration(selected as string)}
            className="min-w-36"
          />
        }
      />
    </>
  );
};

export default NotificationSettingsSection;
