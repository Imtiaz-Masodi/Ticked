import React from "react";
import { Icon } from "../../components/Icon";
import { Icons } from "../../components/Icon/IconMap";

interface SettingsSectionProps {
  title: string;
  description: string;
  icon: Icons;
  className?: string;
  children: React.ReactNode;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, description, icon, children, className = "" }) => {
  return (
    <div
      className={`bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-gray-700/50 rounded-2xl shadow-xl shadow-slate-200/20 dark:shadow-gray-900/20 p-6 ${className}`}
    >
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
        <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
          <Icon name={icon} className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </div>

      {/* Section Content */}
      <div className="space-y-4">{children}</div>
    </div>
  );
};

export default SettingsSection;
