import { Swipeable, SwipeableBgContent } from "../../components/Swipeable";
import { TaskItem } from "../../components/TaskItem";
import {
  useGetTasksQuery,
  useUpdateTaskStatusMutation,
} from "../../store/api/taskApi";
import { Task } from "../../types/Task";
import { NoData } from "../../components/NoData";
import { TasksPageSkeleton } from "../../components/Skeleton";
import { TaskStatus } from "../../utils/enums";
import { getSwipeBackgroundContent, getTitleByStatus } from "./TasksList.helper";

type TasksListProps = {
  status?: TaskStatus | TaskStatus[];
  title?: string;
  leftAction?: TaskStatus;
  rightAction?: TaskStatus;
};

function TasksList({ status, title, leftAction, rightAction }: TasksListProps) {
  const { data, isLoading } = useGetTasksQuery({ status });
  const [updateTaskStatus] = useUpdateTaskStatusMutation();
  const tasks = data?.payload?.tasks || [];

  const handleUpdateTaskStatus = async (taskId: string, taskStatus: TaskStatus) => {
    try {
      await updateTaskStatus({ taskId, taskStatus });
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };

  // Generate swipe background content based on actions (only if actions are defined)
  const leftSwipeContent = leftAction ? getSwipeBackgroundContent(leftAction) : undefined;
  const rightSwipeContent = rightAction ? getSwipeBackgroundContent(rightAction) : undefined;

  if (!isLoading && !tasks.length) {
    return <NoData />;
  }

  return (
    <div className="max-w-screen-lg mx-auto flex flex-col items-center justify-center px-2 gap-2 mt-3">
      <p className="text-sm font-bold text-zinc-600 self-start mx-2">
        {title || getTitleByStatus(status)}
      </p>

      {isLoading && <TasksPageSkeleton taskItemsCount={15} />}

      {!isLoading &&
        tasks.map((task: Task) => (
          <Swipeable
            className="rounded-md shadow-sm"
            swipingLeftBgContent={
              leftSwipeContent && (
                <SwipeableBgContent
                  text={leftSwipeContent.text}
                  icon={leftSwipeContent.icon}
                  themeColorClasses={leftSwipeContent.themeColorClasses}
                />
              )
            }
            swipingRightBgContent={
              rightSwipeContent && (
                <SwipeableBgContent
                  text={rightSwipeContent.text}
                  icon={rightSwipeContent.icon}
                  themeColorClasses={rightSwipeContent.themeColorClasses}
                />
              )
            }
            onSwipeLeft={leftSwipeContent ? () => handleUpdateTaskStatus(task._id, leftSwipeContent.status) : undefined}
            onSwipeRight={rightSwipeContent ? () => handleUpdateTaskStatus(task._id, rightSwipeContent?.status) : undefined}
            key={task._id}
          >
            <TaskItem task={task} />
          </Swipeable>
        ))}
    </div>
  );
}

export default TasksList;
