import { Swipeable, SwipeableBgContent } from "../../components/Swipeable";
import { TaskItem } from "../../components/TaskItem";
import { useGetTasksQuery, useUpdateTaskStatusMutation } from "../../store/api/taskApi";
import { Task } from "../../types/Task";
import { NoData } from "../../components/NoData";
import { TasksPageSkeleton } from "../../components/Skeleton";
import { TaskStatus } from "../../utils/enums";
import { getSwipeBackgroundContent, groupTasksByStatus } from "./TasksList.helper";
import { useApiToast } from "../../utils/toastUtils";
import { useToast } from "../../hooks";
import { useSearchFilter } from "../../hooks";
import { filterTasks, hasActiveSearchOrFilter } from "../../utils/taskFilterUtils";
import { useMemo } from "react";

type TasksListProps = {
  leftAction?: TaskStatus;
  rightAction?: TaskStatus;
};

function TasksList({ leftAction, rightAction }: TasksListProps) {
  const { data, isLoading } = useGetTasksQuery();
  const [updateTaskStatus] = useUpdateTaskStatusMutation();
  const { apiSuccess } = useApiToast();
  const toast = useToast();
  const searchFilterState = useSearchFilter();

  // Apply search and filter to tasks and group by status
  const groupedTasks = useMemo(() => {
    const allTasks = data?.payload?.tasks || [];
    let filteredTasks = allTasks;

    if (hasActiveSearchOrFilter(searchFilterState.state)) {
      filteredTasks = filterTasks(allTasks, searchFilterState.state);
    }

    // Group tasks by status using helper function
    return groupTasksByStatus(filteredTasks);
  }, [data?.payload?.tasks, searchFilterState.state]);

  const revertTaskStatus = async (taskId: string, previousStatus: TaskStatus) => {
    try {
      await updateTaskStatus({ taskId, taskStatus: previousStatus });
      apiSuccess("Task status reverted");
    } catch (error) {
      console.error("Failed to revert task status:", error);
    }
  };

  const handleUpdateTaskStatus = async (taskId: string, newTaskStatus: TaskStatus) => {
    // Find the current task to get its current status for undo functionality
    const allTasks = data?.payload?.tasks || [];
    const currentTask = allTasks.find((task) => task._id === taskId);
    const previousStatus = currentTask?.status;

    try {
      await updateTaskStatus({ taskId, taskStatus: newTaskStatus });

      // Show success toast with undo action
      apiSuccess("Updated the task status", {
        action: previousStatus
          ? {
              label: "Undo",
              onClick: async function (toastId: string) {
                toast.hideToast(toastId);
                revertTaskStatus(taskId, previousStatus);
              },
            }
          : undefined,
      });
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };

  // Generate swipe background content based on actions (only if actions are defined)
  const leftSwipeContent = leftAction ? getSwipeBackgroundContent(leftAction) : undefined;
  const rightSwipeContent = rightAction ? getSwipeBackgroundContent(rightAction) : undefined;

  // Function to render a group of tasks with a title
  const renderTaskGroup = (tasks: Task[], groupTitle: string) => {
    if (tasks.length === 0) return null;

    return (
      <div key={groupTitle} className="w-full">
        <p className="text-sm font-bold text-zinc-600 dark:text-gray-300 self-start mx-2 mb-2">
          {groupTitle} ({tasks.length})
        </p>
        {tasks.map((task: Task) => (
          <div key={task._id} className="mb-2">
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
              onSwipeLeft={
                leftSwipeContent ? () => handleUpdateTaskStatus(task._id, leftSwipeContent.status) : undefined
              }
              onSwipeRight={
                rightSwipeContent ? () => handleUpdateTaskStatus(task._id, rightSwipeContent?.status) : undefined
              }
            >
              <TaskItem task={task} />
            </Swipeable>
          </div>
        ))}
      </div>
    );
  };

  // Calculate total tasks count for NoData check
  const totalTasks = groupedTasks.active.length + groupedTasks.completed.length + groupedTasks.backlog.length;

  if (!isLoading && totalTasks === 0) {
    return <NoData />;
  }

  return (
    <div className="max-w-screen-lg mx-auto flex flex-col items-center justify-center px-4 gap-4 mt-3">
      {isLoading && <TasksPageSkeleton taskItemsCount={15} />}

      {!isLoading && (
        <>
          {renderTaskGroup(groupedTasks.active, "Active Tasks")}
          {renderTaskGroup(groupedTasks.completed, "Completed Tasks")}
          {renderTaskGroup(groupedTasks.backlog, "Backlog Tasks")}
        </>
      )}
    </div>
  );
}

export default TasksList;
