import SkeletonBox from "./SkeletonBox";
import SkeletonGrid from "./SkeletonGrid";

function CategoryCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <SkeletonBox
          width="w-7"
          height="h-7"
          rounded="full"
          className="flex-shrink-0"
        />
          <SkeletonBox width="" height="h-5" className="flex-grow mr-8" />
        <SkeletonBox width="w-12" height="h-6" rounded="full" />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <SkeletonBox width="w-20" height="h-4" />
          <SkeletonBox width="w-5" height="h-5" />
        </div>

        <SkeletonGrid items={4} columns={2} itemHeight="h-10" />
      </div>
    </div>
  );
}

export default CategoryCardSkeleton;
