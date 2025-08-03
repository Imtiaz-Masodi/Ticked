import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik, FormikHelpers } from "formik";
import { Task } from "../types/Task";
import {
  useGetTaskByIdQuery,
  useUpdateTaskMutation,
  useUpdateTaskStatusMutation,
} from "../store/api/taskApi";
import { useGetCategoriesQuery } from "../store/api/categoryApi";
import {
  ApiResponseStatus,
  Priority,
  TaskStatus,
  TaskStatusLabel,
  Size,
} from "../utils/enums";
import {
  priorityColorMap,
  priorityOptions,
  statusOptions,
  statusBadgeClasses,
} from "../utils/options";
import { getUserFriendlyDateTime } from "../helpers/dateHelper";
import { validateTaskForm } from "../sections/TaskForm/TaskForm.helper";
import { TaskFormValues } from "../sections/TaskForm";
import { Button } from "../components/Button";
import { ButtonType, ButtonVariant } from "../components/Button/Button.enum";
import { Input } from "../components/Input";
import { TextArea } from "../components/TextArea";
import { Dropdown } from "../components/Dropdown";
import { Icon } from "../components/Icon";
import { Icons } from "../components/Icon/IconMap";
import CircularLoader from "../components/Loader/CircularLoader/CircularLoader";
import { useApiToast } from "../utils/toastUtils";
import Badge from "../components/Badge";
import { Notification, NotificationType } from "../components/Notification";

function TaskViewer() {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const toast = useApiToast();

  // API hooks
  const {
    data: taskData,
    isLoading: isLoadingTask,
    error: taskError,
  } = useGetTaskByIdQuery(taskId!);
  const { data: categoriesData } = useGetCategoriesQuery();
  const [updateTask] = useUpdateTaskMutation();
  const [updateTaskStatus] = useUpdateTaskStatusMutation();

  const task = taskData?.payload?.task;
  const categories = useMemo(
    () => categoriesData?.payload?.categories || [],
    [categoriesData]
  );
  const category = categories.find((cat) => cat._id === task?.categoryId);

  // Category options
  const categoryOptions = categories;

  // Status variant mapping
  const getStatusVariant = (status: TaskStatus): ButtonVariant => {
    switch (status) {
      case TaskStatus.backlog:
        return ButtonVariant.secondary;
      case TaskStatus.todo:
        return ButtonVariant.info;
      case TaskStatus.inprogress:
        return ButtonVariant.warning;
      case TaskStatus.completed:
        return ButtonVariant.success;
      default:
        return ButtonVariant.secondary;
    }
  };

  // Memoized initial form values based on task data
  const initialFormValues = useMemo(() => {
    if (!task) {
      return {
        title: "",
        description: "",
        priority: { label: "Medium", value: Priority.medium },
        category: undefined,
        dueDate: "",
        dueTime: "",
      };
    }

    const selectedCategory = categories.find(
      (cat) => cat._id === task.categoryId
    );
    const selectedPriority = priorityOptions.find(
      (opt) => opt.value === task.priority
    );

    // Parse due date
    let dueDate = "";
    let dueTime = "";
    if (task.dueDate) {
      const date = new Date(task.dueDate);
      dueDate = date.toISOString().split("T")[0];
      dueTime = date.toTimeString().slice(0, 5);
    }

    return {
      title: task.title,
      description: task.description || "",
      priority: selectedPriority || priorityOptions[1],
      category: selectedCategory || undefined,
      dueDate,
      dueTime,
    };
  }, [task, categories]);

  const handleTaskStatusUpdate = async (newStatus: TaskStatus) => {
    if (!task) return;

    try {
      const response = await updateTaskStatus({
        taskId: task._id,
        taskStatus: newStatus,
      });
      if (response.data?.status === ApiResponseStatus.success) {
        toast.apiSuccess("Task status updated successfully!");
      }
    } catch (error) {
      console.error("Failed to update task status:", error);
      toast.apiError("Failed to update task status");
    }
  };

  const handleFormSubmit = async (
    values: TaskFormValues,
    { setSubmitting }: FormikHelpers<TaskFormValues>
  ) => {
    if (!task) return;

    try {
      const updatedTask: Task = {
        ...task,
        title: values.title,
        description: values.description || "",
        dueDate:
          values.dueDate && values.dueTime
            ? `${values.dueDate}T${values.dueTime}:00`
            : task.dueDate,
        priority: values.priority.value,
        categoryId: values.category!._id,
      };

      const response = await updateTask({ task: updatedTask });
      if (response.data?.status === ApiResponseStatus.success) {
        toast.apiSuccess("Task updated successfully!");
        setIsEditMode(false);
      }
    } catch (error) {
      console.error("Failed to update task:", error);
      toast.apiError("Failed to update task");
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik<TaskFormValues>({
    initialValues: initialFormValues,
    enableReinitialize: true,
    onSubmit: handleFormSubmit,
    validate: validateTaskForm,
  });

  if (isLoadingTask) {
    return (
      <div className="min-h-screen pt-6 flex items-center justify-center">
        <CircularLoader />
      </div>
    );
  }

  if (taskError || !task) {
    // ToDo: Update the UI of this component
    return (
      <div className="min-h-screen pt-6 px-4">
        <div className="my-8">
          <Notification type={NotificationType.ERROR}>
            Task not found or failed to load
          </Notification>
          <div className="mt-4 text-center">
            <Button type={ButtonType.solid} onClick={() => navigate(-1)}>
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-4 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Task Content */}
        <div className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-gray-700/50 rounded-2xl shadow-xl shadow-slate-200/20 dark:shadow-gray-900/20 p-8">
          {/* Priority Indicator and Edit Button */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{
                  backgroundColor: priorityColorMap[task.priority as Priority],
                }}
              />
              <Badge className="capitalize">{task.priority} Priority</Badge>
            </div>

            <div className="flex items-center gap-2">
              {!isEditMode && (
                <div
                  onClick={() => setIsEditMode(true)}
                  className="w-8 h-8 rounded-lg bg-white/80 dark:bg-gray-700/80 border border-sky-200 dark:border-sky-500 hover:bg-slate-50 dark:hover:bg-gray-600 transition-colors cursor-pointer flex items-center justify-center"
                >
                  <Icon name={Icons.edit} className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                </div>
              )}
              {isEditMode && (
                <>
                  <div
                    onClick={() => {
                      setIsEditMode(false);
                      formik.resetForm();
                    }}
                    className="w-8 h-8 rounded-lg bg-white/80 dark:bg-gray-700/80 border border-gray-300 dark:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors cursor-pointer flex items-center justify-center"
                  >
                    <Icon name={Icons.close} className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  </div>
                  <div
                    onClick={() => !formik.isSubmitting && formik.handleSubmit()}
                    className={`w-8 h-8 rounded-lg transition-colors cursor-pointer flex items-center justify-center ${
                      formik.isSubmitting
                        ? "bg-gray-300 dark:bg-gray-600 border border-gray-400 dark:border-gray-500 cursor-not-allowed"
                        : "bg-green-100 dark:bg-green-900/50 border border-green-300 dark:border-green-600 hover:bg-green-200 dark:hover:bg-green-900/70"
                    }`}
                  >
                    {formik.isSubmitting ? (
                      <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Icon name={Icons.check} className="w-4 h-4 text-green-600 dark:text-green-400" />
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Title */}
          <div className={isEditMode ? "mb-6" : "mb-2"}>
            {isEditMode ? (
              <Input
                label="Title"
                name="title"
                placeholder="Task title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorMessage={
                  formik.touched.title && formik.errors.title
                    ? formik.errors.title
                    : undefined
                }
              />
            ) : (
              <h1 className="text-2xl font-semibold text-slate-800 dark:text-gray-200">
                {task.title}
              </h1>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            {isEditMode ? (
              <TextArea
                label="Description"
                name="description"
                placeholder="Task description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                rows={4}
              />
            ) : (
              <p className="text-slate-600 dark:text-gray-400 whitespace-pre-wrap">
                {task.description || "No description provided"}
              </p>
            )}
          </div>

          {/* Task Details Grid */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Category */}
            <div>
              {isEditMode ? (
                <Dropdown
                  name="category"
                  label="Category"
                  options={categoryOptions}
                  value={formik.values.category}
                  getLabel={(option) => option?.name || "Select category"}
                  onChange={(_, selected) =>
                    formik.setFieldValue("category", selected)
                  }
                  errorMessage={
                    formik.touched.category && formik.errors.category
                      ? formik.errors.category
                      : undefined
                  }
                />
              ) : (
                <>
                  <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <div className="flex items-center gap-2">
                    {category && (
                      <>
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: category.categoryColorCode,
                          }}
                        />
                        <span className="text-slate-600 dark:text-gray-400">
                          {category.name}
                        </span>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Priority */}
            <div>
              {isEditMode ? (
                <Dropdown
                  name="priority"
                  label="Priority"
                  options={priorityOptions}
                  value={formik.values.priority}
                  getLabel={(option) => option?.label || "Select priority"}
                  onChange={(_, selected) =>
                    formik.setFieldValue("priority", selected)
                  }
                />
              ) : (
                <>
                  <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                    Priority
                  </label>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor:
                          priorityColorMap[task.priority as Priority],
                      }}
                    />
                    <span className="text-slate-600 dark:text-gray-400 capitalize">
                      {task.priority}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Due Date */}
            <div>
              {isEditMode ? (
                <div className="space-y-2">
                  <Input
                    label="Due Date"
                    type="date"
                    name="dueDate"
                    value={formik.values.dueDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <Input
                    label="Due Time"
                    type="time"
                    name="dueTime"
                    value={formik.values.dueTime}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
              ) : (
                <>
                  <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                    Due Date
                  </label>
                  <span className="text-slate-600 dark:text-gray-400">
                    {task.dueDate
                      ? getUserFriendlyDateTime(task.dueDate)
                      : "No due date set"}
                  </span>
                </>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <div className="flex items-center gap-2">
                <Badge
                  className={statusBadgeClasses[task.status as TaskStatus]}
                >
                  {TaskStatusLabel[task.status as TaskStatus]}
                </Badge>
              </div>
            </div>
          </div>

          {/* Status Update Actions */}
          <div className="border-t border-slate-200 dark:border-gray-700 pt-6">
            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-3">
              Quick Status Update
            </label>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map(({ label, value }) => (
                <Button
                  key={value}
                  type={
                    task.status === value
                      ? ButtonType.solid
                      : ButtonType.outline
                  }
                  variant={getStatusVariant(value)}
                  size={Size.sm}
                  onClick={() => handleTaskStatusUpdate(value)}
                  disabled={task.status === value}
                  className="text-sm"
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>

          {/* Task Metadata */}
          <div className="border-t border-slate-200 dark:border-gray-700 pt-6 mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 gap-y-2 text-sm text-slate-500 dark:text-gray-400">
              <div>
                <span className="font-medium">Created:</span>{" "}
                {getUserFriendlyDateTime(task.createdOn)}
              </div>
              {task.updatedOn && (
                <div>
                  <span className="font-medium">Last Updated:</span>{" "}
                  {getUserFriendlyDateTime(task.updatedOn)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskViewer;
