import { Icons } from "../Icon/IconMap";
import { Button, ButtonVariant } from "../Button";
import { EmptyStateIcon } from "../EmptyStateIcon";
import { useSearchFilter } from "../../hooks";
import { getRouteSpecificFilters } from "../../sections/TasksList/TasksList.helper";
import { StatusType } from "../../utils/enums";

interface NoFilterResultsProps {
  statusType?: StatusType;
}

function NoFilterResults({ statusType }: NoFilterResultsProps) {
  const { clearFilters, updateFilters, state, setSearchActive } = useSearchFilter();

  const handleClearFilters = () => {
    // Clear search query if present
    if (state.searchQuery.trim()) {
      setSearchActive(false);
    }

    // Check if we're on a route that should have specific filters
    if (statusType && statusType !== StatusType.all) {
      // Reset to route-specific filters instead of clearing everything
      const routeSpecificFilters = getRouteSpecificFilters(statusType);
      updateFilters(routeSpecificFilters, true); // true = override all filters
    } else {
      // For /tasks/all or other routes, clear all filters
      clearFilters();
    }
  };

  return (
    <div className="max-w-screen-sm h-[60vh] mx-auto flex flex-col items-center justify-center px-2 gap-6">
      {/* Empty state icon using reusable component */}
      <EmptyStateIcon
        icon={Icons.filter}
        iconClassName="text-amber-600 dark:text-amber-400"
        borderColor="border-amber-300 dark:border-amber-600"
        bgColor="bg-amber-200 dark:bg-amber-700"
      />

      {/* Message */}
      <div className="text-center space-y-2">
        <h3 className="text-lg font-medium text-zinc-800 dark:text-gray-200">No tasks match your filters</h3>
        <p className="text-zinc-600 dark:text-gray-400 text-sm md:text-base px-4 max-w-sm">
          We couldn't find any tasks that match your current search criteria or filters. Try adjusting your filters to
          see more results.
        </p>
      </div>

      {/* Call to action */}
      <Button onClick={handleClearFilters} variant={ButtonVariant.warning} startIcon={Icons.close}>
        Clear Filters
      </Button>
    </div>
  );
}

export default NoFilterResults;
