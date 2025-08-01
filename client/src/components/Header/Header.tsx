import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Size } from "../../utils/enums";
import { useMobileDetect } from "../../hooks/useMediaQuery";
import { NAV_ITEMS } from "../../utils/navigationConfig";
import { AppLogo } from "../AppLogo";
import { Icon } from "../Icon";
import { Icons } from "../Icon/IconMap";

type HeaderProps = {
  onMenuIconClick: () => void;
};

function Header({ onMenuIconClick }: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [showBack, setShowBack] = useState(false);
  const isMobile = useMobileDetect();

  useEffect(() => {
    // Check if current path is in NAV_ITEMS
    const isNavItem = NAV_ITEMS.some((item) => item.path === location.pathname);
    setShowBack(!isNavItem);
  }, [location]);

  // Always show icon on mobile, and show hamburger for NAV_ITEMS or back for other routes
  const shouldShowIcon = isMobile || showBack;

  return (
    <header className={`h-16 px-4 md:px-8 py-2 fixed top-0 left-0 w-full flex items-center justify-between bg-white border-b border-b-zinc-200 z-50 transition-all`}>
      <div className="flex items-center">
        {shouldShowIcon && (
          <Icon
            name={showBack ? Icons.arrowBack : Icons.menu}
            className={`text-2xl text-gray-700 cursor-pointer w-6 text-inherit mr-3 md:mr-4`}
            onClick={() => {
              if (showBack) navigate(-1);
              else onMenuIconClick();
            }}
          />
        )}
        <AppLogo className="text-white" size={Size.sm} />
      </div>
      <Icon name={Icons.notification} className="text-2xl" />
    </header>
  );
}

export default Header;
