import { Button } from "../../components/Button";
import { Dropdown } from "../../components/Dropdown";
import { Input, InputTypes } from "../../components/Input";
import { priorityOptions } from "../../utils/options";
import { TaskFormProps } from "./TaskForm.types";

function TaskForm(props: TaskFormProps) {
  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit, ...formik } = props;

  const handleDropdownChange = (name: string, value: string) => {
    formik.setFieldValue(name, value);
    formik.setFieldTouched(name, true);
  };

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
      <Input
        name="categoryId"
        label="Category"
        value={values?.categoryId}
        type={InputTypes.text}
        onChange={handleChange}
        onBlur={handleBlur}
        errorMessage={touched.categoryId ? errors.categoryId : undefined}
        disabled={isSubmitting}
      />

      <Dropdown
        name="priority"
        label="Priority"
        value={values?.priority}
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

      <Button onClick={handleSubmit} isLoading={isSubmitting} className="mt-4">
        Create Task
      </Button>
    </>
  );
}

export default TaskForm;
