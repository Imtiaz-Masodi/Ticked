import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Size } from "../../utils/enums";
import { useMobileDetect } from "../../hooks/useMediaQuery";
import { NAV_ITEMS } from "../../utils/navigationConfig";
import { AppLogo } from "../AppLogo";
import { Icon } from "../Icon";
import { Icons } from "../Icon/IconMap";
import { DarkModeToggle } from "../DarkModeToggle";
import { SearchInput } from "../SearchInput";
import { FilterPopup } from "../FilterPopup";
import { useSearchFilter } from "../../hooks";

type HeaderProps = {
  onMenuIconClick: () => void;
  showSearchFilter?: boolean;
};

function Header({ onMenuIconClick, showSearchFilter = false }: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [showBack, setShowBack] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const isMobile = useMobileDetect();
  const filterTriggerRef = useRef<HTMLDivElement>(null);

  const { state, setSearchActive } = useSearchFilter();

  useEffect(() => {
    // Check if current path is in NAV_ITEMS
    const isNavItem = NAV_ITEMS.some((item) => item.path === location.pathname);
    setShowBack(!isNavItem);
  }, [location]);

  useEffect(() => {
    setIsFilterOpen(false);
  }, [state.isSearchActive]);

  // Always show icon on mobile, and show hamburger for NAV_ITEMS or back for other routes
  const shouldShowIcon = isMobile || showBack;

  const handleSearchIconClick = () => {
    setSearchActive(true);
  };

  const handleFilterClick = () => {
    setIsFilterOpen(true);
  };

  return (
    <header
      className={`h-16 px-4 md:px-8 py-2 fixed top-0 left-0 w-full flex items-center justify-between bg-white dark:bg-gray-800 border-b border-b-zinc-200 dark:border-b-gray-700 z-50 transition-all`}
    >
      <div className="flex items-center">
        {shouldShowIcon && (
          <Icon
            name={showBack ? Icons.arrowBack : Icons.menu}
            className={`text-2xl text-gray-700 dark:text-gray-300 cursor-pointer w-6 text-inherit mr-3 md:mr-4`}
            onClick={() => {
              if (showBack) navigate(-1);
              else onMenuIconClick();
            }}
          />
        )}
        <AppLogo className={`text-white ${isMobile && state.isSearchActive ? "hidden" : ""}`} size={Size.sm} />
      </div>

      <div className="flex items-center flex-grow justify-end">
        {/* Search Input - shown when search is active */}
        {showSearchFilter && state.isSearchActive && (
          <>
            <div className={`flex-1 max-w-md ${isMobile ? "w-full mx-auto" : ""}`} ref={filterTriggerRef}>
              <SearchInput onFilterClick={handleFilterClick} />
            </div>
            <FilterPopup isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} triggerRef={filterTriggerRef} />
          </>
        )}

        {/* Search Icon - shown when search is not active and search filter is enabled */}
        {showSearchFilter && !state.isSearchActive && (
          <Icon
            name={Icons.search}
            className="text-gray-700 dark:text-gray-300 text-lg cursor-pointer p-3"
            onClick={handleSearchIconClick}
          />
        )}

        <DarkModeToggle />
      </div>
    </header>
  );
}

export default Header;
