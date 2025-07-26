import { Icons } from "../../components/Icon/IconMap";
import { Swipeable, SwipeableBgContent } from "../../components/Swipeable";
import { TaskItem } from "../../components/TaskItem";
import { useGetTasksQuery } from "../../store/api/taskApi";
import { Task } from "../../types/Task";
import { NoData } from "../../components/NoData";
import { TasksPageSkeleton } from "../../components/Skeleton";

function TasksList() {
  const { data, isLoading } = useGetTasksQuery();
  const tasks = data?.payload?.tasks || [];

  return (
    <div className="max-w-screen-lg mx-auto flex flex-col items-center justify-center px-2 gap-2 mt-3">
      <p className="text-sm font-bold text-zinc-600 self-start mx-2">Todo</p>

      {isLoading && <TasksPageSkeleton taskItemsCount={15} />}

      {!isLoading && !tasks.length && <NoData />}

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
            onSwipeLeft={() => {}}
            onSwipeRight={() => {}}
            key={task._id}
          >
            <TaskItem task={task} />
          </Swipeable>
        ))}
    </div>
  );
}

export default TasksList;
