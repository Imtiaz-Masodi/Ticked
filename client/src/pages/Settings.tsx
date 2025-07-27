import React from "react";
import { useToast } from "../hooks/useToast";
import { Button } from "../components/Button";

const Settings: React.FC = () => {
  const { success, error, warning, info } = useToast();

  const handleSuccessToast = () => {
    success("Task completed successfully!", {
      title: "Success",
      duration: 5000,
    });
  };

  const handleErrorToast = () => {
    error("Failed to save changes. Please try again.", {
      title: "Error",
      duration: 0, // Manual dismiss only
    });
  };

  const handleWarningToast = () => {
    warning("Your session will expire in 5 minutes.", {
      title: "Warning",
      duration: 8000,
      action: {
        label: "Extend Session",
        onClick: () => alert("Session extended!"),
      },
    });
  };

  const handleInfoToast = () => {
    info("New features are available in the latest update.", {
      title: "Info",
      duration: 6000,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Settings</h1>
        <p className="text-lg text-gray-600 mb-2">
          This page is currently under development.
        </p>
        <p className="text-md text-gray-500">
          Check back soon for new features!
        </p>
      </div>

      {/* Toast Demo Section */}
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Toast Notification Demo
        </h2>
        <div className="space-y-3">
          <Button
            onClick={handleSuccessToast}
            className="w-full bg-green-500 hover:bg-green-600 text-white"
          >
            Show Success Toast
          </Button>
          <Button
            onClick={handleErrorToast}
            className="w-full bg-red-500 hover:bg-red-600 text-white"
          >
            Show Error Toast
          </Button>
          <Button
            onClick={handleWarningToast}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
          >
            Show Warning Toast
          </Button>
          <Button
            onClick={handleInfoToast}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
          >
            Show Info Toast
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
