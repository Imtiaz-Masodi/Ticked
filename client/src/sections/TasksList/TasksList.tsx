import { Swipeable } from "../../components/Swipeable";
import { TaskItem } from "../../components/TaskItem";
import { useGetTasksQuery } from "../../store/api/taskApi";
import { Task } from "../../types/Task";

function TasksList() {
  const { data } = useGetTasksQuery();
  const tasks = data?.payload?.tasks || [];

  return (
    <div className="max-w-screen-md mx-auto flex flex-col items-center justify-center px-2 gap-2">
      <p className="text-sm font-bold text-zinc-600 self-start mx-2">Todo</p>
      {tasks.map((task: Task) => (
        <Swipeable
          className="rounded-md"
          swipingLeftBgContent={
            <div className="bg-sky-500 h-full text-right flex justify-end items-center px-4 text-white">
              Mark as Complete
            </div>
          }
          swipingRightBgContent={
            <div className="bg-rose-500 h-full flex justify-start items-center px-4 text-white">Archive</div>
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
