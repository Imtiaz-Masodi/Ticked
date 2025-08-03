import SkeletonBox from "./SkeletonBox";

type TaskViewerSkeletonProps = {
  isInline?: boolean;
};

function TaskViewerSkeleton({ isInline = false }: TaskViewerSkeletonProps) {
  return (
    <div className={`${isInline ? "min-h-0 pt-2 mt-8" : "min-h-screen pt-4"} px-4`}>
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-gray-700/50 rounded-2xl shadow-xl shadow-slate-200/20 dark:shadow-gray-900/20 p-8">
          {/* Priority Indicator and Edit Button Skeleton */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              {isInline && <SkeletonBox width="w-8" height="h-8" rounded="lg" />}
              <SkeletonBox width="w-4" height="h-4" rounded="full" />
              <SkeletonBox width="w-24" height="h-6" rounded="full" />
            </div>
            <SkeletonBox width="w-8" height="h-8" rounded="lg" />
          </div>

          {/* Title Skeleton */}
          <div className="mb-2">
            <SkeletonBox width="w-3/4" height="h-8" className="mb-2" />
          </div>

          {/* Description Skeleton */}
          <div className="mb-6">
            <SkeletonBox width="w-full" height="h-4" className="mb-2" />
            <SkeletonBox width="w-5/6" height="h-4" className="mb-2" />
            <SkeletonBox width="w-3/4" height="h-4" />
          </div>

          {/* Task Details Grid Skeleton */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Category Skeleton */}
            <div>
              <SkeletonBox width="w-16" height="h-4" className="mb-2" />
              <div className="flex items-center gap-2">
                <SkeletonBox width="w-3" height="h-3" rounded="full" />
                <SkeletonBox width="w-20" height="h-4" />
              </div>
            </div>

            {/* Priority Skeleton */}
            <div>
              <SkeletonBox width="w-12" height="h-4" className="mb-2" />
              <div className="flex items-center gap-2">
                <SkeletonBox width="w-3" height="h-3" rounded="full" />
                <SkeletonBox width="w-16" height="h-4" />
              </div>
            </div>

            {/* Due Date Skeleton */}
            <div>
              <SkeletonBox width="w-16" height="h-4" className="mb-2" />
              <SkeletonBox width="w-32" height="h-4" />
            </div>

            {/* Status Skeleton */}
            <div>
              <SkeletonBox width="w-12" height="h-4" className="mb-2" />
              <SkeletonBox width="w-20" height="h-6" rounded="full" />
            </div>
          </div>

          {/* Status Update Actions Skeleton */}
          <div className="border-t border-slate-200 dark:border-gray-700 pt-6">
            <SkeletonBox width="w-32" height="h-4" className="mb-3" />
            <div className="flex flex-wrap gap-2">
              {[...Array(4)].map((_, index) => (
                <SkeletonBox key={index} width="w-20" height="h-8" rounded="md" />
              ))}
            </div>
          </div>

          {/* Task Metadata Skeleton */}
          <div className="border-t border-slate-200 dark:border-gray-700 pt-6 mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 gap-y-2">
              <SkeletonBox width="w-48" height="h-4" />
              <SkeletonBox width="w-52" height="h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskViewerSkeleton;
