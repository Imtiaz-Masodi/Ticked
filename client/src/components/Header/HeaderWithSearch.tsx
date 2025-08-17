import { useSearchFilter } from "../../hooks";
import Header from "./Header";

type HeaderWithSearchProps = {
  onMenuIconClick: () => void;
  showSearchFilter?: boolean;
};

/**
 * Header component that integrates with SearchFilterContext.
 * Use this when the component is wrapped with SearchFilterProvider.
 */
function HeaderWithSearch({ onMenuIconClick, showSearchFilter = false }: HeaderWithSearchProps) {
  const searchFilters = useSearchFilter();

  return <Header onMenuIconClick={onMenuIconClick} showSearchFilter={showSearchFilter} searchFilters={searchFilters} />;
}

export default HeaderWithSearch;
