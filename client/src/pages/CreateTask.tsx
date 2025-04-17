import { useFormik } from "formik";
import { TaskForm, TaskFormValues } from "../sections/TaskForm";
import { Priority } from "../utils/enums";
import { getTomorrowDateString } from "../helpers/dateHelper";

function CreateTask() {
  const formik = useFormik<TaskFormValues>({
    initialValues: {
      title: "",
      priority: Priority.medium,
      categoryId: "",
      dueDate: getTomorrowDateString(),
      dueTime: "12:00",
    },
    onSubmit: (values) => {},
    validate: (values) => {},
  });

  return (
    <div className="pt-6 px-4">
      <div className="my-8">
        <div className="text-center text-2xl font-thin sm:text-3xl">Create Task</div>
        <div className="text-center text-sm text-gray-500 font-thin">Start organizing your tasks effortlessly</div>
      </div>

      <div className="flex flex-col gap-4 max-w-sm mx-auto">
        <TaskForm {...formik} />
      </div>
    </div>
  );
}

export default CreateTask;
