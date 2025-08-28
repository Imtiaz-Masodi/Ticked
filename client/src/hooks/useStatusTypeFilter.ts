import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSearchFilter } from "./useSearchFilter";
import { TaskStatus, StatusType } from "../utils/enums";

/**
 * Custom hook to handle URL parameter :id for status types and update SearchFilterContext
 * Works with /tasks/:id route where :id can be a status type or task id
 * @param shouldApplyFilter - Whether to apply the filter or not
 */
export const useStatusTypeFilter = (shouldApplyFilter: boolean = true) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { statusType } = useParams<{ statusType: StatusType }>();
  const { updateFilters, clearFilters } = useSearchFilter();

  useEffect(() => {
    // Only apply filter if shouldApplyFilter is true
    if (!shouldApplyFilter) return;

    // Check if we're on a tasks route with an id parameter
    if (location.pathname.startsWith("/tasks/") && statusType) {
      // Check if the id is a valid status type
      if (Object.values(StatusType).includes(statusType as StatusType)) {
        // Apply filters based on statusType
        switch (statusType) {
          case StatusType.all:
            clearFilters();
            break;
          case StatusType.active:
            updateFilters({
              statuses: [TaskStatus.todo, TaskStatus.inprogress],
              categories: [],
              priorities: [],
              dueDateRange: undefined,
            });
            break;
          case StatusType.completed:
            updateFilters({
              statuses: [TaskStatus.completed],
              categories: [],
              priorities: [],
              dueDateRange: undefined,
            });
            break;
          case StatusType.backlog:
            updateFilters({
              statuses: [TaskStatus.backlog],
              categories: [],
              priorities: [],
              dueDateRange: undefined,
            });
            break;
          default:
            break;
        }
      }
      // If it's not a status type, it might be a task ID - don't handle filtering in that case
    }
  }, [location.pathname, statusType, updateFilters, clearFilters, navigate, shouldApplyFilter]);
};
