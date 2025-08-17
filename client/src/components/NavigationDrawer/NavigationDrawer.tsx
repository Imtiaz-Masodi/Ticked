import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "../Icon";
import { Icons } from "../Icon/IconMap";
import { useMobileDetect, useLogout } from "../../hooks";
import { UserInfoHeader } from "../UserInfoHeader";
import { APP_ROUTES } from "../../utils/routes";

export type NavigationItem = {
  name: string;
  path: string;
  queryParams?: Record<string, string>;
  icon: Icons;
};

type NavigationDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  navItems: readonly NavigationItem[];
  activeNavItemPath?: string;
};

export const NavigationDrawer = ({ isOpen, onClose, navItems, activeNavItemPath }: NavigationDrawerProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMobileDetect(); // Using our custom hook

  // Use activeNavItemPath prop if provided, otherwise fall back to location.pathname
  const currentActivePath = activeNavItemPath ?? location.pathname;

  const handleNavigation = (path: string, queryParams?: Record<string, string>) => {
    const url = new URL(path, window.location.origin);
    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        url.searchParams.set(key, value);
      });
    }
    navigate(url.pathname + url.search);
    if (isMobile) {
      onClose();
    }
  };

  const logout = useLogout();
  const handleLogout = () => logout();

  return (
    <>
      {/* Overlay for mobile with CSS fade effect */}
      {isMobile && (
        <div
          className={`
            fixed inset-0 top-[64px] bg-black z-20 transition-opacity duration-300 ease-in-out
            ${isOpen ? "opacity-50 pointer-events-auto z-10" : "opacity-0 pointer-events-none -z-10"}
          `}
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`
          fixed top-16 bottom-0 left-0 z-30
          w-80 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out
          border-r border-r-zinc-200 dark:border-r-gray-700
          ${isOpen || !isMobile ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* User Info */}
          <UserInfoHeader onEditProfile={() => handleNavigation(APP_ROUTES.PROFILE)} />
          {/* Navigation Items */}
          <div className="flex-grow py-4">
            {navItems.map((item) => {
              const isActive = currentActivePath === item.path;

              return (
                <div
                  key={item.path}
                  className={`
                    flex items-center px-6 py-3 cursor-pointer
                    transition-colors duration-200
                    ${
                      isActive
                        ? "bg-zinc-100 dark:bg-gray-700 border-r-4 border-r-blue-500"
                        : "hover:bg-zinc-50 dark:hover:bg-gray-700"
                    }
                  `}
                  onClick={() => handleNavigation(item.path, item.queryParams)}
                >
                  <Icon
                    name={item.icon}
                    className={`text-xl ${isActive ? "text-blue-500" : "text-zinc-600 dark:text-gray-400"}`}
                  />
                  <span
                    className={`ml-4 text-sm font-medium select-none ${
                      isActive ? "text-blue-500" : "text-zinc-700 dark:text-gray-300"
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Logout button at bottom */}
          <div className="border-t border-t-zinc-200 dark:border-t-gray-700">
            <div
              className="flex items-center p-6 cursor-pointer hover:bg-zinc-50 dark:hover:bg-gray-700 transition-colors duration-200"
              onClick={handleLogout}
            >
              <Icon name={Icons.logout} className="text-xl text-zinc-600 dark:text-gray-400" />
              <span className="ml-4 text-sm font-medium text-zinc-700 dark:text-gray-300 select-none">Logout</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationDrawer;
