import React from "react";
import { UserAvatar } from "../UserAvatar";
import Badge from "../Badge";
import { Icon } from "../Icon";
import { Icons } from "../Icon/IconMap";

interface User {
  name?: string;
  email: string;
  accountVerified: boolean;
  createdOn: Date;
}

interface ProfileCardProps {
  user: User;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  const joinedDate = new Date(user.createdOn).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="text-center">
        <UserAvatar text={user.name || user.email} size={80} className="mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">{user.name || "No name set"}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{user.email}</p>

        {user.accountVerified ? (
          <Badge variant="success" size="sm">
            <Icon name={Icons.check} className="w-3 h-3 mr-1" />
            Verified
          </Badge>
        ) : (
          <Badge variant="warning" size="sm">
            <Icon name={Icons.warning} className="w-3 h-3 mr-1" />
            Unverified
          </Badge>
        )}

        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">Member since {joinedDate}</p>
        </div>
      </div>
    </div>
  );
};
