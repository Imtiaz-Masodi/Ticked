import React from "react";
import { Button } from "../../components/Button";
import { ButtonType, ButtonVariant } from "../../components/Button/Button.enum";
import { Size } from "../../utils/enums";
import { SettingItem } from "../../components/SettingItem";
import { useApiToast } from "../../utils/toastUtils";

const DataPrivacySection: React.FC = () => {
  const toast = useApiToast();

  const handleExportData = () => {
    toast.apiSuccess("Data export functionality coming soon!");
  };

  const handleClearCompletedTasks = () => {
    toast.apiSuccess("Clear completed tasks functionality coming soon!");
  };

  return (
    <>
      <SettingItem
        label="Export Data"
        description="Download your tasks and categories as JSON"
        control={
          <Button type={ButtonType.outline} size={Size.sm} onClick={handleExportData}>
            Export
          </Button>
        }
      />

      <SettingItem
        label="Clear Completed Tasks"
        description="Remove all completed tasks permanently"
        control={
          <Button
            type={ButtonType.outline}
            variant={ButtonVariant.warning}
            size={Size.sm}
            onClick={handleClearCompletedTasks}
          >
            Clear
          </Button>
        }
      />
    </>
  );
};

export default DataPrivacySection;
