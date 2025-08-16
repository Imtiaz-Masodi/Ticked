import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { NavigationDrawer } from "../../components/NavigationDrawer";
import { NAV_ITEMS } from "../../utils/navigationConfig";
import { authHelper } from "../../helpers/authHelper";
import { EVENT_AUTH_EXPIRED } from "../../utils/constants";
import { useLogout, useTabletOrAboveDetect } from "../../hooks";
import { SearchFilterProvider } from "../../contexts/SearchFilterContext";

function RootContainer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isUserLoggedIn = authHelper.isUserLoggedIn();
  const isLargeScreen = useTabletOrAboveDetect();
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useLogout();

  const handleToggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  // Determine if the current page should show search/filter functionality
  const shouldShowSearchFilter =
    location.pathname.startsWith("/tasks/") ||
    (isLargeScreen && location.pathname.startsWith("/task/") && location.pathname !== "/task/new");

  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate("/login");
    }
  }, [isUserLoggedIn, navigate]);

  // Listen for authentication errors from RTK Query
  useEffect(() => {
    const handleAuthExpired = () => {
      logout();
    };

    window.addEventListener(EVENT_AUTH_EXPIRED, handleAuthExpired);

    return () => {
      window.removeEventListener(EVENT_AUTH_EXPIRED, handleAuthExpired);
    };
  }, [logout]);

  return (
    <SearchFilterProvider>
      <div id="root-container" className="min-h-dvh bg-zinc-50 dark:bg-gray-900">
        <Header onMenuIconClick={handleToggleDrawer} showSearchFilter={shouldShowSearchFilter} />
        <NavigationDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          navItems={NAV_ITEMS}
          activeNavItemPath={location.pathname}
        />
        <div className="py-16 md:pl-80 transition-all duration-300">
          <Outlet />
        </div>
      </div>
    </SearchFilterProvider>
  );
}

export default RootContainer;
