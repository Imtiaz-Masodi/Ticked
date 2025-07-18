import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { NavigationDrawer } from "../../components/NavigationDrawer";
import { NAV_ITEMS } from "../../utils/navigationConfig";
import { authHelper } from "../../helpers/authHelper";

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

  return (
    <div id="root-container" className="min-h-screen bg-zinc-50">
      <Header onMenuIconClick={handleToggleDrawer} />
      <NavigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        navItems={NAV_ITEMS}
        activeNavItemPath={location.pathname}
      />
      <div className="py-16 md:pl-64 mx-2 transition-all duration-300">
        <Outlet />
      </div>
    </div>
  );
}

export default RootContainer;
