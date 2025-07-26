import SkeletonBox from "./SkeletonBox";

function TaskItemSkeleton() {
  return (
    <div className="w-full px-4 py-2 bg-white shadow-sm flex items-stretch gap-4 rounded-md overflow-hidden">
      <SkeletonBox
        width="w-1"
        height=""
        className="-ms-4 -my-1.5 flex-shrink-0"
      />
      <div className="flex flex-col justify-center flex-grow gap-2">
        <SkeletonBox width="w-3/4" height="h-5" />
        <div className="flex items-center gap-2">
          <SkeletonBox width="w-10" height="h-3" />
          <SkeletonBox width="w-20" height="h-3" />
        </div>
      </div>
    </div>
  );
}

export default TaskItemSkeleton;
