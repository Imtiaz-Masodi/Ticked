import { Icons } from "../../components/Icon/IconMap";
import { Swipeable, SwipeableBgContent } from "../../components/Swipeable";
import { TaskItem } from "../../components/TaskItem";
import { useGetTasksQuery, useUpdateTaskStatusMutation } from "../../store/api/taskApi";
import { Task } from "../../types/Task";
import { NoData } from "../../components/NoData";
import { TasksPageSkeleton } from "../../components/Skeleton";
import { TaskStatus } from "../../utils/enums";

type TasksListProps = {
  status?: TaskStatus[];
  title?: string;
};

function TasksList({ status, title }: TasksListProps) {
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

  // Determine the title based on status if not provided
  const getTitle = () => {
    if (title) return title;
    if (!status || status.length === 0) return "All Tasks";
    if (status.includes(TaskStatus.todo) && status.includes(TaskStatus.inprogress)) return "Active Tasks";
    if (status.includes(TaskStatus.completed)) return "Completed Tasks";
    if (status.includes(TaskStatus.backlog)) return "Backlog Tasks";
    return "Tasks";
  };

  if (!isLoading && !tasks.length) {
    return <NoData />
  }

  return (
    <div className="max-w-screen-lg mx-auto flex flex-col items-center justify-center px-2 gap-2 mt-3">
      <p className="text-sm font-bold text-zinc-600 self-start mx-2">{getTitle()}</p>

      {isLoading && <TasksPageSkeleton taskItemsCount={15} />}

      {!isLoading &&
        tasks.map((task: Task) => (
          <Swipeable
            className="rounded-md shadow-sm"
            swipingLeftBgContent={
              <SwipeableBgContent
                text="Done"
                icon={Icons.taskDone}
                themeColorClasses="bg-green-500"
              />
            }
            swipingRightBgContent={
              <SwipeableBgContent
                text="Backlog"
                icon={Icons.archive}
                themeColorClasses="bg-red-500"
              />
            }
            onSwipeLeft={() => handleUpdateTaskStatus(task._id, TaskStatus.completed)}
            onSwipeRight={() => handleUpdateTaskStatus(task._id, TaskStatus.backlog)}
            key={task._id}
          >
            <TaskItem task={task} />
          </Swipeable>
        ))}
    </div>
  );
}

export default TasksList;
