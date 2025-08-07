import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { NavigationDrawer } from "../../components/NavigationDrawer";
import { NAV_ITEMS } from "../../utils/navigationConfig";
import { authHelper } from "../../helpers/authHelper";
import { EVENT_AUTH_EXPIRED } from "../../utils/constants";

function RootContainer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isUserLoggedIn = authHelper.isUserLoggedIn();
  const navigate = useNavigate();
  const location = useLocation();

  const handleToggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate("/login");
    }
  }, [isUserLoggedIn, navigate]);

  // Listen for authentication errors from RTK Query
  useEffect(() => {
    const handleAuthExpired = () => {
      navigate("/login");
    };

    window.addEventListener(EVENT_AUTH_EXPIRED, handleAuthExpired);

    return () => {
      window.removeEventListener(EVENT_AUTH_EXPIRED, handleAuthExpired);
    };
  }, [navigate]);

  return (
    <div id="root-container" className="min-h-dvh bg-zinc-50 dark:bg-gray-900">
      <Header onMenuIconClick={handleToggleDrawer} />
      <NavigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        navItems={NAV_ITEMS}
        activeNavItemPath={location.pathname}
      />
      <div className="py-16 md:pl-64 transition-all duration-300">
        <Outlet />
      </div>
    </div>
  );
}

export default RootContainer;
