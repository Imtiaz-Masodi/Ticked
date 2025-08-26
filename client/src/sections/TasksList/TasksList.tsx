import { Swipeable, SwipeableBgContent } from "../../components/Swipeable";
import { TaskItem } from "../../components/TaskItem";
import { useGetTasksQuery, useUpdateTaskStatusMutation } from "../../store/api/taskApi";
import { Task } from "../../types/Task";
import { NoData } from "../../components/NoData";
import { NoFilterResults } from "../../components/NoFilterResults";
import { TasksPageSkeleton } from "../../components/Skeleton";
import { TaskStatus } from "../../utils/enums";
import { groupTasksByStatus, getSwipeActionsForTask } from "./TasksList.helper";
import { useApiToast } from "../../utils/toastUtils";
import { useToast } from "../../hooks";
import { useSearchFilter } from "../../hooks";
import { filterTasks, hasActiveSearchOrFilter } from "../../utils/taskFilterUtils";
import { useMemo } from "react";

function TasksList() {
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

  // Function to render a group of tasks with a title
  const renderTaskGroup = (tasks: Task[], groupTitle: string) => {
    if (tasks.length === 0) return null;

    return (
      <div key={groupTitle} className="w-full">
        <p className="text-sm font-bold text-zinc-600 dark:text-gray-300 self-start mx-2 mb-2">
          {groupTitle} ({tasks.length})
        </p>
        {tasks.map((task: Task) => {
          // Get swipe actions based on current task status
          const { leftAction, rightAction } = getSwipeActionsForTask(task.status);

          return (
            <div key={task._id} className="mb-2">
              <Swipeable
                className="rounded-md shadow-sm"
                swipingLeftBgContent={
                  leftAction && (
                    <SwipeableBgContent
                      text={leftAction.text}
                      icon={leftAction.icon}
                      themeColorClasses={leftAction.themeColorClasses}
                    />
                  )
                }
                swipingRightBgContent={
                  rightAction && (
                    <SwipeableBgContent
                      text={rightAction.text}
                      icon={rightAction.icon}
                      themeColorClasses={rightAction.themeColorClasses}
                    />
                  )
                }
                onSwipeLeft={leftAction ? () => handleUpdateTaskStatus(task._id, leftAction.status) : undefined}
                onSwipeRight={rightAction ? () => handleUpdateTaskStatus(task._id, rightAction.status) : undefined}
              >
                <TaskItem task={task} />
              </Swipeable>
            </div>
          );
        })}
      </div>
    );
  };

  // Calculate total tasks count for NoData check
  const totalTasks = groupedTasks.active.length + groupedTasks.completed.length + groupedTasks.backlog.length;
  const hasActiveFiltersOrSearch = hasActiveSearchOrFilter(searchFilterState.state);

  if (!isLoading && totalTasks === 0) {
    // Show different components based on whether filters/search are active
    if (hasActiveFiltersOrSearch) {
      return <NoFilterResults />;
    }
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
