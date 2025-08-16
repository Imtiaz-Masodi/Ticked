import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSearchFilter } from "./useSearchFilter";
import { TaskStatus } from "../utils/enums";

type StatusType = "all" | "active" | "completed" | "backlog";

/**
 * Custom hook to handle URL parameter :id for status types and update SearchFilterContext
 * Works with /tasks/:id route where :id can be a status type or task id
 */
export const useStatusTypeFilter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { updateFilters, clearFilters } = useSearchFilter();

  useEffect(() => {
    // Handle legacy /tasks route by redirecting to /tasks/all
    if (location.pathname === "/tasks") {
      navigate("/tasks/all", { replace: true });
      return;
    }

    // Check if we're on a tasks route with an id parameter
    if (location.pathname.startsWith("/tasks/") && id) {
      const statusType = id as StatusType;

      // Check if the id is a valid status type
      if (["all", "active", "completed", "backlog"].includes(statusType)) {
        // Apply filters based on statusType
        switch (statusType) {
          case "all":
            clearFilters();
            break;
          case "active":
            updateFilters({
              statuses: [TaskStatus.todo, TaskStatus.inprogress],
              categories: [],
              priorities: [],
              dueDateRange: undefined,
            });
            break;
          case "completed":
            updateFilters({
              statuses: [TaskStatus.completed],
              categories: [],
              priorities: [],
              dueDateRange: undefined,
            });
            break;
          case "backlog":
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
  }, [location.pathname, id, updateFilters, clearFilters, navigate]);
};
