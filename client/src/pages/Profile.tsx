import React from "react";
import { useGetCurrentUserQuery } from "../store/api/accountApi";
import { Button } from "../components/Button";
import { Icon } from "../components/Icon";
import { Icons } from "../components/Icon/IconMap";
import { ProfileCard } from "../components/ProfileCard";
import { ProfileForm } from "../components/ProfileForm";
import { ProfilePageSkeleton } from "../components/Skeleton";
import { UpdatePassword } from "../sections/UpdatePassword";
import { useLocation } from "react-router-dom";

const Profile: React.FC = () => {
  const { data: userData, isLoading: isLoadingUser, error: userError } = useGetCurrentUserQuery();
  const location = useLocation();
  const showUpdatePasswordForm = location.search.includes("update-password=1");

  const user = userData?.payload?.user;

  if (isLoadingUser) {
    return <ProfilePageSkeleton />;
  }

  if (userError || !user) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center text-red-600 dark:text-red-400">
          <Icon name={Icons.error} className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Failed to load profile</h2>
          <p className="mb-4">Please try refreshing the page</p>
          <Button onClick={() => window.location.reload()}>Refresh Page</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="mt-2 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">Profile</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your personal information</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <ProfileCard user={user} />
        </div>
        <div className="lg:col-span-2">
          <ProfileForm user={user} />
          <UpdatePassword user={user} showUpdateForm={showUpdatePasswordForm} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
