import { useMemo } from "react";
import { TaskStatus } from "../../utils/enums";
import { SkeletonBox, SkeletonGrid } from "../Skeleton";
import { Task } from "../../types/Task";
import { ApiResponse } from "../../types/ApiResponse";

interface TaskStats {
  todo: number;
  inprogress: number;
  completed: number;
  backlog: number;
}

interface CategoryTaskStatsProps {
  tasksByCategory: ApiResponse<{ tasks: Task[] }> | undefined;
  isLoading: boolean;
}

function CategoryTaskStats({ tasksByCategory, isLoading }: CategoryTaskStatsProps) {
  const taskStats: TaskStats = useMemo(() => {
    const tasksData = { todo: 0, inprogress: 0, completed: 0, backlog: 0 };
    tasksByCategory?.payload?.tasks.forEach((task: Task) => {
      switch (task.status) {
        case TaskStatus.todo:
          tasksData.todo += 1;
          break;
        case TaskStatus.inprogress:
          tasksData.inprogress += 1;
          break;
        case TaskStatus.completed:
          tasksData.completed += 1;
          break;
        case TaskStatus.backlog:
          tasksData.backlog += 1;
          break;
        default:
          break;
      }
    });
    return tasksData;
  }, [tasksByCategory]);

  const totalTasks = taskStats.todo + taskStats.inprogress + taskStats.completed + taskStats.backlog;

  return (
    <div className="space-y-2">
      {isLoading ? (
        <>
          <div className="flex justify-between items-center">
            <SkeletonBox width="w-20" height="h-4" />
            <SkeletonBox width="w-5" height="h-5" />
          </div>
          <SkeletonGrid items={4} columns={2} itemHeight="h-10" />
        </>
      ) : totalTasks > 0 ? (
        <>
          <div className="flex justify-between items-center mx-1">
            <span className="text-sm font-medium text-zinc-700">
              Total Tasks
            </span>
            <span className="text-md font-semibold text-zinc-900">
              {totalTasks}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex justify-between items-center p-2 bg-blue-50 rounded-lg">
              <span className="text-xs font-medium text-blue-700">To Do</span>
              <span className="text-sm font-bold text-blue-900">
                {taskStats.todo}
              </span>
            </div>
            <div className="flex justify-between items-center p-2 bg-yellow-50 rounded-lg">
              <span className="text-xs font-medium text-yellow-700">
                In Progress
              </span>
              <span className="text-sm font-bold text-yellow-900">
                {taskStats.inprogress}
              </span>
            </div>
            <div className="flex justify-between items-center p-2 bg-green-50 rounded-lg">
              <span className="text-xs font-medium text-green-700">
                Completed
              </span>
              <span className="text-sm font-bold text-green-900">
                {taskStats.completed}
              </span>
            </div>
            <div className="flex justify-between items-center p-2 bg-red-50 rounded-lg">
              <span className="text-xs font-medium text-red-700">Backlog</span>
              <span className="text-sm font-bold text-red-900">
                {taskStats.backlog}
              </span>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-4">
          <p className="text-sm text-zinc-500 mt-4">
            No tasks in this category yet
          </p>
        </div>
      )}
    </div>
  );
}

export default CategoryTaskStats;
