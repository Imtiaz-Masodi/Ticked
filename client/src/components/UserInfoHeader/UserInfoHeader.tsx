import React from "react";
import { useGetCurrentUserQuery } from "../../store/api/accountApi";
import UserAvatar from "../UserAvatar/UserAvatar";
import { Icons } from "../Icon/IconMap";
import { Icon } from "../Icon";
import { SkeletonBox } from "../Skeleton";

type UserInfoHeaderType = {
  onEditProfile: () => void;
};

/**
 * Shared header-style user info block used in navigation drawer (and reusable elsewhere).
 * Fetches current user internally; optionally can accept overrides later if needed.
 */
export const UserInfoHeader: React.FC<UserInfoHeaderType> = ({ onEditProfile }) => {
  const { data, isLoading } = useGetCurrentUserQuery();
  const user = data?.payload?.user;

  return (
    <div className="px-5 pt-5 pb-4 border-b border-b-zinc-200 dark:border-b-gray-700">
      <div className="flex items-center justify-between gap-3">
        {isLoading ? (
          <>
            {/* Avatar skeleton */}
            <SkeletonBox width="w-12" height="h-12" rounded="full" className="flex-shrink-0" />
            {/* User info skeleton */}
            <div className="min-w-0 flex-grow space-y-1.5">
              <SkeletonBox width="w-32" height="h-4" />
              <SkeletonBox width="w-24" height="h-3" />
            </div>
            {/* Edit button skeleton */}
            <SkeletonBox className="mr-2" width="w-4" height="h-4" rounded="md" />
          </>
        ) : (
          <>
            <UserAvatar text={user?.name || user?.email} size={48} className="flex-shrink-0" />
            <div className="min-w-0 flex-grow">
              <p className="text-sm font-semibold text-zinc-800 dark:text-gray-100 truncate">
                {user?.name || user?.email || "Guest"}
              </p>
              <p className="text-xs text-zinc-500 dark:text-gray-400 truncate">{user?.email || "No email"}</p>
            </div>

            <button
              type="button"
              aria-label="Edit profile"
              title="Edit profile"
              onClick={onEditProfile}
              className="p-2 rounded-md text-zinc-500 hover:text-blue-600 hover:bg-zinc-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <Icon name={Icons.right} className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserInfoHeader;
