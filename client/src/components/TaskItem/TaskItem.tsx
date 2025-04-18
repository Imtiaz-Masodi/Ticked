import { getUserFriendlyDate } from "../../helpers/dateHelper";
import { useGetCategoriesQuery } from "../../store/api/categoryApi";
import { Task } from "../../types/Task";
import { priorityColorMap } from "../../utils/options";

type TaskItemProps = React.PropsWithChildren<{
  task: Task;
}>;

function TaskItem({ task }: TaskItemProps) {
  const { data } = useGetCategoriesQuery();
  const category = data?.payload?.categories.find((category) => category._id === task.categoryId) || null;

  return (
    <div className="task-item-container w-full h-16 px-4 py-1.5 bg-white shadow-sm flex items-stretch gap-4 rounded-md overflow-hidden">
      <div className="w-1 flex -ms-4 -my-1.5" style={{ backgroundColor: priorityColorMap[task.priority] }}></div>
      <div className="flex flex-col justify-center flex-grow">
        <h2 className="text-xl text-zinc-700">{task.title}</h2>

        <div className="flex items-center gap-2">
          {category && (
            <p style={{ color: category.categoryColorCode }} className="text-xs">
              {category.name}
            </p>
          )}
          <p className="text-xs text-zinc-700">{getUserFriendlyDate(task.dueDate)}</p>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
