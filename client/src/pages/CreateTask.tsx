import { FormikHelpers, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { TaskForm, TaskFormValues } from "../sections/TaskForm";
import { ApiResponseStatus, Priority } from "../utils/enums";
import { getTomorrowDateString } from "../helpers/dateHelper";
import { Category } from "../types/Category";
import { validateTaskForm } from "../sections/TaskForm/TaskForm.helper";
import { useCreateTaskMutation } from "../store/api/taskApi";
import { Task } from "../types/Task";
import { Notification, NotificationType } from "../components/Notification";
import { useApiToast } from "../utils/toastUtils";

function CreateTask() {
  const navigate = useNavigate();
  const toast = useApiToast();
  const [triggerCreateTask, createTaskResponse] = useCreateTaskMutation();

  const handleFormSubmit = async (
    values: TaskFormValues,
    { setSubmitting }: FormikHelpers<TaskFormValues>
  ) => {
    try {
      const response = await triggerCreateTask({
        title: values.title,
        description: values.description || "",
        dueDate: `${values.dueDate}T${values.dueTime}:00`,
        priority: values.priority.value,
        categoryId: values.category!._id,
      } as Task);

      if (response.data?.status === ApiResponseStatus.success) {
        formik.resetForm();
        toast.apiSuccess(response.data.message || "Task created successfully!");
        setTimeout(() => navigate("/"), 1500);
      }
    } catch (ex) {
      console.log((ex as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik<TaskFormValues>({
    initialValues: {
      title: "",
      priority: { label: "Medium", value: Priority.medium },
      category: { _id: "3", name: "Others" } as Category,
      dueDate: getTomorrowDateString(),
      dueTime: "12:00",
    },
    onSubmit: handleFormSubmit,
    validate: validateTaskForm,
  });

  return (
    <div className="pt-6 px-4">
      <div className="my-8">
        <div className="text-center text-2xl sm:text-3xl text-black/70 dark:text-white/80">
          Create Task
        </div>
        <div className="text-center text-sm text-zinc-400 dark:text-gray-400 font-light">
          Start organizing your tasks effortlessly
        </div>
      </div>

      <div className="flex flex-col gap-4 max-w-sm mx-auto px-6">
        {createTaskResponse.data?.status == ApiResponseStatus.failed && (
          <Notification
            type={NotificationType.ERROR}
          >
            {createTaskResponse.data?.message}
          </Notification>
        )}
        {/* @ts-expect-error Ignore */}
        <TaskForm {...formik} />
      </div>
    </div>
  );
}

export default CreateTask;
