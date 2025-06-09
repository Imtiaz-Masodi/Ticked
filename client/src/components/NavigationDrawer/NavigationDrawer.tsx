import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "../Icon";
import { Icons } from "../Icon/IconMap";
import { useMobileDetect } from "../../hooks";
import { authHelper } from "../../helpers/authHelper";

type NavigationItem = {
  name: string;
  path: string;
  icon: Icons;
};

const NAV_ITEMS: NavigationItem[] = [
  { name: "All Tasks", path: "/", icon: Icons.task },
  { name: "Categories", path: "/categories", icon: Icons.category },
  { name: "Backlogs", path: "/backlogs", icon: Icons.archive },
  { name: "Completed", path: "/completed", icon: Icons.taskDone },
  { name: "Settings", path: "/settings", icon: Icons.settings },
];

type NavigationDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const NavigationDrawer = ({
  isOpen,
  onClose,
}: NavigationDrawerProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMobileDetect(); // Using our custom hook

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      onClose();
    }
  };

  const handleLogout = () => {
    authHelper.removeUserToken();
    navigate("/login");
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 top-[64px] bg-black bg-opacity-50 z-20"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`
          fixed top-16 bottom-0 left-0 z-30
          w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          border-r border-r-zinc-200
          ${isOpen || !isMobile ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Navigation Items */}
          <div className="flex-grow py-4">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.path}
                className={`
                  flex items-center px-6 py-3 cursor-pointer
                  transition-colors duration-200
                  ${
                    location.pathname === item.path
                      ? "bg-zinc-100 border-r-4 border-r-blue-500"
                      : "hover:bg-zinc-50"
                  }
                `}
                onClick={() => handleNavigation(item.path)}
              >
                <Icon
                  name={item.icon}
                  className={`text-xl ${
                    location.pathname === item.path
                      ? "text-blue-500"
                      : "text-zinc-600"
                  }`}
                />
                <span
                  className={`ml-4 text-sm font-medium ${
                    location.pathname === item.path
                      ? "text-blue-500"
                      : "text-zinc-700"
                  }`}
                >
                  {item.name}
                </span>
              </div>
            ))}
          </div>

          {/* Logout button at bottom */}
          <div className="px-6 py-4 border-t border-t-zinc-200">
            <div
              className="flex items-center py-3 cursor-pointer hover:bg-zinc-50 transition-colors duration-200"
              onClick={handleLogout}
            >
              <Icon name={Icons.logout} className="text-xl text-zinc-600" />
              <span className="ml-4 text-sm font-medium text-zinc-700">
                Logout
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationDrawer;
