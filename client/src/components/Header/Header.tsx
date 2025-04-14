import { Size } from "../../utils/enums";
import { AppLogo } from "../AppLogo";
import { Icon } from "../Icon";
import { Icons } from "../Icon/IconMap";

function Header() {
  return (
    <div className="h-16 px-8 py-2 fixed top-0 left-0 w-full shadow-md flex items-center justify-between bg-primary-darker z-10">
      <AppLogo className="text-white" size={Size.sm} darkMode />
      <Icon name={Icons.notification} className="text-2xl text-zinc-100" />
    </div>
  );
}

export default Header;
