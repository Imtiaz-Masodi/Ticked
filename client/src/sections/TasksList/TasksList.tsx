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
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
}

export default TasksList;
