import React from "react";
import SkeletonBox from "./SkeletonBox";

const ProfilePageSkeleton: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      {/* Header Skeleton */}
      <div className="mt-2 mb-6">
        <SkeletonBox width="w-32" height="h-8" className="mb-2" />
        <SkeletonBox width="w-64" height="h-5" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card Skeleton */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="text-center">
              {/* Avatar Skeleton */}
              <SkeletonBox width="w-20" height="h-20" className="mx-auto mb-4" rounded="full" />
              {/* Name Skeleton */}
              <SkeletonBox width="w-32" height="h-6" className="mx-auto mb-1" />
              {/* Email Skeleton */}
              <SkeletonBox width="w-40" height="h-4" className="mx-auto mb-4" />
              {/* Badge Skeleton */}
              <SkeletonBox width="w-20" height="h-6" className="mx-auto mb-4" rounded="lg" />

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                {/* Member since Skeleton */}
                <SkeletonBox width="w-36" height="h-4" className="mx-auto" />
              </div>
            </div>
          </div>
        </div>

        {/* Profile Form Skeleton */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Form Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            {/* Form Header */}
            <div className="flex items-center justify-between mb-6 border-b border-gray-200 dark:border-gray-700 pb-6">
              <SkeletonBox width="w-48" height="h-6" />
              <SkeletonBox width="w-24" height="h-9" rounded="md" />
            </div>

            {/* Form Fields */}
            <div className="grid gap-6">
              {/* Name Field */}
              <div>
                <SkeletonBox width="w-12" height="h-4" className="mb-2" />
                <SkeletonBox width="w-full" height="h-10" rounded="lg" />
              </div>

              {/* Bio Field */}
              <div>
                <SkeletonBox width="w-8" height="h-4" className="mb-2" />
                <SkeletonBox width="w-full" height="h-32" rounded="lg" />
              </div>

              {/* Location Field */}
              <div>
                <SkeletonBox width="w-16" height="h-4" className="mb-2" />
                <SkeletonBox width="w-full" height="h-10" rounded="lg" />
              </div>

              {/* Date of Birth Field */}
              <div>
                <SkeletonBox width="w-24" height="h-4" className="mb-2" />
                <SkeletonBox width="w-full" height="h-10" rounded="lg" />
              </div>
            </div>
          </div>

          {/* Update Password Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
              <SkeletonBox width="w-48" height="h-6 mb-6" />
            </div>
            {/* Section Header */}
            <div className="flex items-center justify-between">
              <div>
                <SkeletonBox width="w-32" height="h-6" className="mb-2" />
                <SkeletonBox width="w-48" height="h-4" />
              </div>
              <SkeletonBox width="w-24" height="h-9" rounded="lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageSkeleton;
