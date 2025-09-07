import React, { useEffect, useMemo, useState } from "react";
import { Dropdown } from "../../components/Dropdown";
import { Toggle } from "../../components/Toggle";
import { SettingItem } from "../../components/SettingItem";
import { Size } from "../../utils/enums";
import { priorityOptions } from "../../utils/options";
import { useGetCategoriesQuery } from "../../store/api/categoryApi";
import { Category } from "../../types/Category";
import { PriorityType } from "../../types/PriorityType";

const TaskPreferencesSection: React.FC = () => {
  const { data: categoriesData } = useGetCategoriesQuery();
  const categories = useMemo(() => {
    return categoriesData?.payload?.categories || [];
  }, [categoriesData?.payload?.categories]);

  // Local state for settings
  const [defaultPriority, setDefaultPriority] = useState<PriorityType>(priorityOptions[1]); // Medium
  const [defaultCategory, setDefaultCategory] = useState<Category | undefined>();
  const [autoArchiveCompleted, setAutoArchiveCompleted] = useState(false);

  useEffect(() => {
    if (!defaultCategory && categories?.length > 0) {
      setDefaultCategory(categories.find((cat) => cat.name === "Others"));
    }
  }, [categories, defaultCategory]);

  return (
    <>
      <SettingItem
        label="Default Priority"
        description="Set the default priority for new tasks"
        control={
          <Dropdown
            name="defaultPriority"
            options={priorityOptions}
            value={defaultPriority}
            getLabel={(option) => option.label}
            onChange={(_, selected) => setDefaultPriority(selected as PriorityType)}
          />
        }
      />

      <SettingItem
        label="Default Category"
        description="Set the default category for new tasks"
        control={
          <Dropdown
            name="defaultCategory"
            options={categories}
            value={defaultCategory}
            getLabel={(option) => option.name}
            onChange={(_, selected) => setDefaultCategory(selected as Category)}
            className="!min-w-52"
          />
        }
      />

      <SettingItem
        label="Auto-archive Completed"
        description="Automatically move completed tasks to archive after 30 days"
        control={
          <Toggle checked={autoArchiveCompleted} onChange={setAutoArchiveCompleted} variant="primary" size={Size.md} />
        }
      />
    </>
  );
};

export default TaskPreferencesSection;
