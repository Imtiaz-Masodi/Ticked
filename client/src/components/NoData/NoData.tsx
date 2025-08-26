import { useNavigate } from "react-router-dom";
import { Icons } from "../Icon/IconMap";
import { Button, ButtonVariant } from "../Button";
import { EmptyStateIcon } from "../EmptyStateIcon";
import { TASK_ROUTES } from "../../utils/routes";

function NoData() {
  const navigate = useNavigate();

  return (
    <div className="max-w-screen-sm h-[80vh] mx-auto flex flex-col items-center justify-center px-2 gap-6">
      {/* Empty state icon using reusable component */}
      <EmptyStateIcon icon={Icons.document} size="lg" />

      {/* Message */}
      <div className="text-center space-y-2">
        <h3 className="text-lg font-medium text-zinc-800 dark:text-gray-200">No tasks here</h3>
        <p className="text-zinc-600 dark:text-gray-400 text-sm md:text-base px-4 max-w-sm">
          This section is currently empty. Add a new task to get started.
        </p>
      </div>

      {/* Call to action */}
      <Button onClick={() => navigate(TASK_ROUTES.TASK_NEW)} variant={ButtonVariant.info} startIcon={Icons.add}>
        Create Task
      </Button>
    </div>
  );
}

export default NoData;
