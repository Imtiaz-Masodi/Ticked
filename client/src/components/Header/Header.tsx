import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Size } from "../../utils/enums";
import { AppLogo } from "../AppLogo";
import { Icon } from "../Icon";
import { Icons } from "../Icon/IconMap";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showBack, setShowBack] = useState(false);

  useEffect(() => {
    setShowBack(location.pathname !== "/");
  }, [location]);

  return (
    <div className="h-16 px-8 py-2 fixed top-0 left-0 w-full flex items-center justify-between bg-white border-b border-b-zinc-200 z-10">
      <div className="flex items-center gap-4">
        <Icon
          name={Icons.arrowBack}
          className={`text-2xl text-gray-700 cursor-pointer ${
            showBack ? "w-6 text-inherit" : "w-0 text-transparent"
          } transition-all`}
          onClick={() => navigate(-1)}
        />
        <AppLogo className="text-white" size={Size.sm} />
      </div>
      <Icon name={Icons.notification} className="text-2xl" />
    </div>
  );
}

export default Header;
