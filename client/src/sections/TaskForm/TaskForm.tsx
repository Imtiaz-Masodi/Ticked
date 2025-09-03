import { useEffect, useMemo, useState } from "react";
import { Button } from "../../components/Button";
import { Dropdown } from "../../components/Dropdown";
import { Input, InputTypes } from "../../components/Input";
import { TextArea } from "../../components/TextArea";
import { Toggle } from "../../components/Toggle";
import { useGetCategoriesQuery } from "../../store/api/categoryApi";
import { Category } from "../../types/Category";
import { PriorityType } from "../../types/PriorityType";
import { priorityOptions } from "../../utils/options";
import { TaskFormProps } from "./TaskForm.types";
import { getTomorrowDateString } from "../../helpers/dateHelper";
import { Size } from "../../utils";

function TaskForm(props: TaskFormProps) {
  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit, ...formik } = props;
  const { data } = useGetCategoriesQuery();
  const categories = useMemo(() => data?.payload?.categories || [], [data]);
  const [hasDueDate, setHasDueDate] = useState(false);

  // Sync toggle state when form values change (e.g., when editing an existing task)
  useEffect(() => {
    if (hasDueDate && !values.dueDate) {
      formik.setFieldValue("dueDate", getTomorrowDateString());
      formik.setFieldValue("dueTime", "12:00");
    } else if (!hasDueDate && values.dueDate) {
      formik.setFieldValue("dueDate", "");
      formik.setFieldValue("dueTime", "");
    }
  }, [formik, hasDueDate, values.dueDate]);

  const handleDropdownChange = <T,>(name: string, value: T) => {
    formik.setFieldValue(name, value);
    formik.setFieldTouched(name, true);
  };

  const handleToggleChange = (value: boolean) => {
    setHasDueDate(value);
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    formik.setFieldValue(e.target.name, e.target.value);
  };

  const handleTextAreaBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    formik.setFieldTouched(e.target.name, true);
  };

  useEffect(() => {
    if (categories?.length > 0 && !values?.category) {
      formik.setFieldValue("category", categories[0]);
      formik.setFieldTouched("category", true);
    }
  }, [categories, formik, values?.category]);

  return (
    <>
      <Input
        name="title"
        label="Task Title"
        value={values?.title}
        type={InputTypes.text}
        onChange={handleChange}
        onBlur={handleBlur}
        errorMessage={touched.title ? errors.title : undefined}
        disabled={isSubmitting}
      />
      <TextArea
        name="description"
        label="Description"
        value={values?.description}
        rows={5}
        onChange={handleTextAreaChange}
        onBlur={handleTextAreaBlur}
        errorMessage={touched.description ? errors.description : undefined}
        disabled={isSubmitting}
      />

      <Dropdown<Category>
        name="category"
        label="Category"
        value={values?.category}
        options={categories}
        getLabel={(category) => (
          <div className="flex items-center">
            <div
              className="w-3 h-3 rounded-full mr-2.5"
              style={{ backgroundColor: category.categoryColorCode || "#A78C00" }}
            />
            <span>{category.name}</span>
          </div>
        )}
        getLabelKey={(category) => category._id}
        onChange={handleDropdownChange}
        errorMessage={touched.category ? errors.category : undefined}
        disabled={isSubmitting}
      />

      <Dropdown<PriorityType>
        name="priority"
        label="Priority"
        value={values?.priority}
        getLabel={(priority) => priority.label}
        options={priorityOptions}
        onChange={handleDropdownChange}
        errorMessage={touched.priority ? errors.priority : undefined}
        disabled={isSubmitting}
      />

      {hasDueDate && (
        <div className="flex items-center gap-2">
          <Input
            name="dueDate"
            label="Due Date"
            value={values?.dueDate}
            type={InputTypes.date}
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessage={touched.dueDate ? errors.dueDate : undefined}
            disabled={isSubmitting}
          />

          <Input
            name="dueTime"
            label="Due Time"
            value={values?.dueTime}
            type={InputTypes.time}
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessage={touched.dueTime ? errors.dueTime : undefined}
            disabled={isSubmitting}
          />
        </div>
      )}

      <div className="flex items-center justify-between px-1 mt-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Set Due Date</label>
        <Toggle size={Size.sm} checked={hasDueDate} onChange={handleToggleChange} disabled={isSubmitting} />
      </div>

      <Button onClick={handleSubmit} isLoading={isSubmitting} className="mt-2 w-full">
        Create Task
      </Button>
    </>
  );
}

export default TaskForm;
