import TaskItemSkeleton from "./TaskItemSkeleton";

type TasksPageSkeletonProps = {
  taskItemsCount?: number;
};

function TasksPageSkeleton({ taskItemsCount = 5 }: TasksPageSkeletonProps) {
  return (
    <>
      {[...Array(taskItemsCount)].map((_, index) => (
        <TaskItemSkeleton key={index} />
      ))}
    </>
  );
}

export default TasksPageSkeleton;
