import { useGetTasksByCategoryQuery } from "../../store/api/taskApi";
import { Category } from "../../types/Category";
import { useMemo } from "react";
import { TaskStatus } from "../../utils/enums";
import Button from "../Button/Button";
import { ButtonType } from "../Button/Button.enum";
import { Icons } from "../Icon/IconMap";
import Badge from "../Badge/Badge";
import { Tooltip } from "../Tooltip";

interface CategoryCardProps {
  category: Category;
}

interface TaskStats {
  todo: number;
  inprogress: number;
  completed: number;
  backlog: number;
}

function CategoryCard({ category }: CategoryCardProps) {
  const { data: tasksByCategory, isLoading } = useGetTasksByCategoryQuery({
    categoryId: category._id,
  });

  const taskStats: TaskStats = useMemo(() => {
    const tasksData = {
      todo: 0,
      inprogress: 0,
      completed: 0,
      backlog: 0,
    };
    tasksByCategory?.payload?.tasks.forEach((task) => {
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

  const totalTasks =
    taskStats.todo +
    taskStats.inprogress +
    taskStats.completed +
    taskStats.backlog;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-5 h-5 rounded-full flex-shrink-0"
          style={{ backgroundColor: category.categoryColorCode }}
        />
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-zinc-800">
            {category.name}
          </h3>
          {category.createdOn && (
            <p className="text-sm text-zinc-500">
              Created on {new Date(category.createdOn).toLocaleDateString()}
            </p>
          )}
        </div>
        {category.preDefined ? (
          <Badge variant="primary" size="sm">
            System
          </Badge>
        ) : (
          <Tooltip content="Edit category" placement="top">
            <Button
              type={ButtonType.link}
              startIcon={Icons.settings}
              iconOnly={true}
              className="-mr-2"
              onClick={() => {
                // Handle edit category functionality here
                console.log("Edit category:", category.name);
              }}
            />
          </Tooltip>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-zinc-700">Total Tasks</span>
          {isLoading ? (
            <div className="w-8 h-6 bg-gray-200 animate-pulse rounded"></div>
          ) : (
            <span className="text-lg font-bold text-zinc-900">
              {totalTasks}
            </span>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-3">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-12 bg-gray-200 animate-pulse rounded-lg"
              ></div>
            ))}
          </div>
        ) : totalTasks > 0 ? (
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
        ) : (
          <div className="text-center py-4">
            <p className="text-sm text-zinc-500">
              No tasks in this category yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryCard;
