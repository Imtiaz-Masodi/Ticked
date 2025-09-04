import { calculateChecklistProgress } from "../../helpers/taskHelper";
import { useGetCategoriesQuery } from "../../store/api/categoryApi";
import { Task } from "../../types/Task";
import { priorityColorMap } from "../../utils/options";
import { SkeletonBox } from "../Skeleton";
import { Icon } from "../Icon";
import { Icons } from "../Icon/IconMap";
import { useNavigate, useParams } from "react-router-dom";
import { RelativeDateText } from "../RelativeDateText";
import { TaskStatus } from "../../utils";

type TaskItemProps = React.PropsWithChildren<{
  task: Task;
}>;

function TaskItem({ task }: TaskItemProps) {
  const navigate = useNavigate();
  const { taskId } = useParams<{ taskId?: string }>();
  const { data } = useGetCategoriesQuery();
  const category = data?.payload?.categories.find((category) => category._id === task.categoryId) || null;

  const isSelected = taskId === task._id;

  // Calculate checklist progress
  const { totalItems, completedItems, isCompleted } = calculateChecklistProgress(task);

  const handleTaskClick = () => {
    navigate(`/task/${task._id}`);
  };

  return (
    <div
      className={`task-item-container group w-full px-4 py-1.5 shadow-sm flex items-stretch gap-4 rounded-md overflow-hidden hover:cursor-pointer transition-all duration-200 ${
        isSelected
          ? "bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-700"
          : "bg-white dark:bg-gray-800 border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-600"
      }`}
      onClick={handleTaskClick}
    >
      <div
        className="w-1 flex -ms-4 -my-1.5 flex-shrink-0"
        style={{ backgroundColor: priorityColorMap[task.priority] }}
      />
      <div className="flex flex-col justify-center flex-grow gap-1">
        <h2 className="text-xl text-zinc-700 dark:text-gray-200 leading-tight select-none">{task.title}</h2>

        <div className="flex items-center gap-3 md:gap-4">
          {category ? (
            <div className="flex items-center gap-1">
              <Icon name={Icons.category} className="text-xs text-gray-500 dark:text-gray-400" />
              <p style={{ color: category.categoryColorCode }} className="text-xs select-none">
                {category.name}
              </p>
            </div>
          ) : (
            <SkeletonBox width="w-10" height="h-3" />
          )}

          {task.status !== TaskStatus.completed && task.dueDate && (
            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
              <Icon name={Icons.calendarClock} className="text-xs" />
              <RelativeDateText date={task.dueDate} showTime={false} className="text-xs" />
            </div>
          )}

          {/* Checklist Progress Indicator */}
          {totalItems > 0 && (
            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
              <Icon name={isCompleted ? Icons.taskDone : Icons.task} className={`text-sm`} />
              <span className="text-xs  select-none">
                {completedItems}/{totalItems}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center">
        <Icon
          name={Icons.right}
          className="text-zinc-700 dark:text-gray-300 text-xl transition-transform duration-200 ease-in-out group-hover:translate-x-1"
        />
      </div>
    </div>
  );
}

export default TaskItem;
