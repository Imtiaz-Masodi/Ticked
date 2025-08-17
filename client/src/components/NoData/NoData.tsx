import { Link } from "react-router-dom";
import { Icon } from "../Icon";
import { Icons } from "../Icon/IconMap";
import { TASK_ROUTES } from "../../utils/routes";

function NoData() {
  return (
    <div className="max-w-screen-sm h-[80vh] mx-auto flex flex-col items-center justify-center px-2 gap-6">
      {/* Empty state icon using CSS */}
      <div className="relative">
        <div className="w-24 h-24 rounded-full border-4 border-dashed border-zinc-300 dark:border-gray-600 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-zinc-200 dark:bg-gray-700 flex items-center justify-center">
            <Icon name={Icons.document} className="w-6 h-6 text-zinc-400 dark:text-gray-500" />
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="text-center space-y-2">
        <h3 className="text-lg font-medium text-zinc-800 dark:text-gray-200">No tasks here</h3>
        <p className="text-zinc-600 dark:text-gray-400 text-sm md:text-base px-4 max-w-sm">
          This section is currently empty. Add a new task to get started.
        </p>
      </div>

      {/* Call to action */}
      <Link
        to={TASK_ROUTES.TASK_NEW}
        className="inline-flex items-center gap-2 px-8 py-3 bg-sky-500 hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-700 text-white rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
      >
        <Icon name={Icons.add} className="w-5 h-5" />
        Create Task
      </Link>
    </div>
  );
}

export default NoData;
