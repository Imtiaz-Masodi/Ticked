import React from "react";
export type UserAvatarProps = {
  text?: string | null; // source text to derive initials (e.g., name or email)
  size?: number; // px
  className?: string;
};

export const UserAvatar: React.FC<UserAvatarProps> = ({ text, size = 48, className = "" }) => {
  const source = text?.trim() || "?";
  const initials = source
    .split(/\s+|\.|_|@/)
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      style={{ width: size, height: size }}
      className={`flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold select-none shadow-sm ${className}`}
    >
      {initials}
    </div>
  );
};

export default UserAvatar;
