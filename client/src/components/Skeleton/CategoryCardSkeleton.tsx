import SkeletonBox from "./SkeletonBox";
import SkeletonGrid from "./SkeletonGrid";

function CategoryCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-4">
        <SkeletonBox
          width="w-5"
          height="h-5"
          rounded="full"
          className="flex-shrink-0"
        />
        <div className="flex-grow">
          <SkeletonBox width="" height="h-5" className="mb-2" />
        </div>
        <SkeletonBox width="w-12" height="h-6" rounded="full" />
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <SkeletonBox width="w-20" height="h-4" />
          <SkeletonBox width="w-8" height="h-6" />
        </div>

        <SkeletonGrid items={4} columns={2} itemHeight="h-10" />
      </div>
    </div>
  );
}

export default CategoryCardSkeleton;
