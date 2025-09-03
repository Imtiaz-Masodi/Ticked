import { FormikHelpers, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { TaskForm, TaskFormValues } from "../sections/TaskForm";
import { ApiResponseStatus, Priority } from "../utils/enums";
import { Category } from "../types/Category";
import { validateTaskForm } from "../sections/TaskForm/TaskForm.helper";
import { useCreateTaskMutation } from "../store/api/taskApi";
import { Task } from "../types/Task";
import { Notification, NotificationType } from "../components/Notification";
import { useApiToast } from "../utils/toastUtils";
import { TASK_ROUTES } from "../utils/routes";

function CreateTask() {
  const navigate = useNavigate();
  const toast = useApiToast();
  const [triggerCreateTask, createTaskResponse] = useCreateTaskMutation();

  const handleFormSubmit = async (values: TaskFormValues, { setSubmitting }: FormikHelpers<TaskFormValues>) => {
    try {
      const taskData: Partial<Task> = {
        title: values.title,
        description: values.description || "",
        priority: values.priority.value,
        categoryId: values.category!._id,
      };

      // Only include due date if both date and time are provided
      if (values.dueDate) {
        taskData.dueDate = `${values.dueDate}`;
        if (values.dueTime) taskData.dueDate = `${values.dueDate}T${values.dueTime}:00`;
      }

      const response = await triggerCreateTask(taskData as Task);

      if (response.data?.status === ApiResponseStatus.success) {
        formik.resetForm();
        toast.apiSuccess(response.data.message || "Task created successfully!");
        setTimeout(() => navigate(TASK_ROUTES.TASKS_ALL), 1500);
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
      dueDate: "",
      dueTime: "",
    },
    onSubmit: handleFormSubmit,
    validate: validateTaskForm,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-6 -mb-16 px-4">
      <div className="my-8">
        <div className="text-center text-2xl sm:text-3xl text-slate-800 dark:text-white/80">Create Task</div>
        <div className="text-center text-sm text-slate-500 dark:text-gray-400 font-light">
          Start organizing your tasks effortlessly
        </div>
      </div>

      <div className="max-w-md mx-auto">
        {createTaskResponse.data?.status == ApiResponseStatus.failed && (
          <div className="mb-4">
            <Notification type={NotificationType.ERROR}>{createTaskResponse.data?.message}</Notification>
          </div>
        )}

        <div className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-gray-700/50 rounded-2xl shadow-xl shadow-slate-200/20 dark:shadow-gray-900/20 p-8">
          <div className="flex flex-col gap-4">
            {/* @ts-expect-error Ignore */}
            <TaskForm {...formik} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTask;
