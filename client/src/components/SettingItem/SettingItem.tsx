import React from "react";

interface SettingItemProps {
  label: string;
  description: string;
  control: React.ReactNode;
  danger?: boolean;
}

const SettingItem: React.FC<SettingItemProps> = ({ label, description, control, danger = false }) => {
  return (
    <div
      className={`flex items-center justify-between p-4 rounded-lg border ${
        danger
          ? "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20"
          : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
      }`}
    >
      <div className="flex-1">
        <h4 className={`font-medium ${danger ? "text-red-700 dark:text-red-300" : "text-gray-900 dark:text-gray-100"}`}>
          {label}
        </h4>
        <p className={`text-sm ${danger ? "text-red-600 dark:text-red-400" : "text-gray-500 dark:text-gray-400"} mt-1`}>
          {description}
        </p>
      </div>
      <div className="ml-4">{control}</div>
    </div>
  );
};

export default SettingItem;
