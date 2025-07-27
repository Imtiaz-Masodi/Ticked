import React from "react";

const Settings: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Settings</h1>
        <p className="text-lg text-gray-600 mb-2">
          This page is currently under development.
        </p>
        <p className="text-md text-gray-500">
          Check back soon for new features!
        </p>
      </div>
    </div>
  );
};

export default Settings;
