import { getUserFriendlyDate } from "../../helpers/dateHelper";
import { useGetCategoriesQuery } from "../../store/api/categoryApi";
import { Task } from "../../types/Task";
import { priorityColorMap } from "../../utils/options";
import { SkeletonBox } from "../Skeleton";
import { Icon } from "../Icon";
import { Icons } from "../Icon/IconMap";

type TaskItemProps = React.PropsWithChildren<{
  task: Task;
}>;

function TaskItem({ task }: TaskItemProps) {
  const { data } = useGetCategoriesQuery();
  const category = data?.payload?.categories.find((category) => category._id === task.categoryId) || null;

  return (
    <div className="task-item-container group w-full px-4 py-1.5 bg-white dark:bg-gray-800 shadow-sm flex items-stretch gap-4 rounded-md overflow-hidden hover:cursor-pointer">
      <div className="w-1 flex -ms-4 -my-1.5 flex-shrink-0" style={{ backgroundColor: priorityColorMap[task.priority] }} />
      <div className="flex flex-col justify-center flex-grow gap-1">
        <h2 className="text-xl text-zinc-700 dark:text-gray-200 leading-tight select-none">{task.title}</h2>

        <div className="flex items-center gap-2">
          {category ? (
            <p style={{ color: category.categoryColorCode }} className="text-xs select-none">
              {category.name}
            </p>
          ) : (
            <SkeletonBox width="w-10" height="h-3" />
          )}
          <p className="text-xs text-zinc-700 dark:text-gray-300 select-none">{getUserFriendlyDate(task.dueDate)}</p>
        </div>
      </div>
      <div className="flex items-center">
        <Icon name={Icons.right} className="text-zinc-700 dark:text-gray-300 text-xl transition-transform duration-200 ease-in-out group-hover:translate-x-1" />
      </div>
    </div>
  );
}

export default TaskItem;
