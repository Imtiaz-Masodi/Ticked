import { useEffect, useMemo } from "react";
import { Button } from "../../components/Button";
import { Dropdown } from "../../components/Dropdown";
import { Input, InputTypes } from "../../components/Input";
import { useGetCategoriesQuery } from "../../store/api/categoryApi";
import { Category } from "../../types/Category";
import { PriorityType } from "../../types/PriorityType";
import { priorityOptions } from "../../utils/options";
import { TaskFormProps } from "./TaskForm.types";

function TaskForm(props: TaskFormProps) {
  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit, ...formik } = props;
  const { data } = useGetCategoriesQuery();
  const categories = useMemo(() => data?.payload?.categories || [], [data]);

  const handleDropdownChange = <T,>(name: string, value: T) => {
    formik.setFieldValue(name, value);
    formik.setFieldTouched(name, true);
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
      <Input
        name="description"
        label="Description"
        value={values?.description}
        type={InputTypes.text}
        onChange={handleChange}
        onBlur={handleBlur}
        errorMessage={touched.description ? errors.description : undefined}
        disabled={isSubmitting}
      />

      <Dropdown<Category>
        name="category"
        label="Category"
        value={values?.category}
        options={categories}
        getLabel={(category) => category.name}
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

      <Button onClick={handleSubmit} isLoading={isSubmitting} className="mt-6 w-full">
        Create Task
      </Button>
    </>
  );
}

export default TaskForm;
