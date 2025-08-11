import React from "react";
import { useGetCurrentUserQuery } from "../../store/api/accountApi";
import PulseLoader from "../Loader/PulseLoader/PulseLoader";
import UserAvatar from "../UserAvatar/UserAvatar";

/**
 * Shared header-style user info block used in navigation drawer (and reusable elsewhere).
 * Fetches current user internally; optionally can accept overrides later if needed.
 */
export const UserInfoHeader: React.FC = () => {
  const { data, isLoading } = useGetCurrentUserQuery();
  const user = data?.payload?.user;

  return (
    <div className="px-5 pt-5 pb-4 border-b border-b-zinc-200 dark:border-b-gray-700">
      <div className="flex items-center gap-3">
        {isLoading ? (
          <div className="w-12 h-12 flex items-center justify-center">
            <PulseLoader />
          </div>
        ) : (
          <UserAvatar text={user?.name || user?.email} size={48} className="flex-shrink-0" />
        )}
        <div className="min-w-0">
          <p className="text-sm font-semibold text-zinc-800 dark:text-gray-100 truncate">
            {user?.name || user?.email || (isLoading ? "Loading..." : "Guest")}
          </p>
          <p className="text-xs text-zinc-500 dark:text-gray-400 truncate">{user?.email || "No email"}</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfoHeader;
