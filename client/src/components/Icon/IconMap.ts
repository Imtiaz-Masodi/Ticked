import { ElementType } from "react";
import HiddenComponent from "../../assets/svg/hidden.svg";
import VisibleComponent from "../../assets/svg/visible.svg";
import SettingsComponent from "../../assets/svg/settings.svg";
import SearchComponent from "../../assets/svg/search.svg";
import CheckComponent from "../../assets/svg/check.svg";
import HRComponent from "../../assets/svg/hr.svg";
import AccountComponent from "../../assets/svg/account.svg";
import NotificationComponent from "../../assets/svg/notification.svg";
import LogoutComponent from "../../assets/svg/logout.svg";
import AddComponent from "../../assets/svg/add.svg";
import ArrowBackComponent from "../../assets/svg/arrow_back.svg";

export async function importIcon(path: string) {
  const module = await import(path);
  return module;
}

export enum Icons {
  hidden = "hidden",
  visible = "visible",
  settings = "settings",
  search = "search",
  check = "check",
  hr = "hr",
  account = "account",
  notification = "notification",
  logout = "logout",
  add = "add",
  arrowBack = "arrow-back",
}

type IconMapType = {
  [key in Icons]: ElementType | string;
};
export const IconMap: IconMapType = {
  [Icons.hidden]: HiddenComponent,
  [Icons.visible]: VisibleComponent,
  [Icons.settings]: SettingsComponent,
  [Icons.search]: SearchComponent,
  [Icons.check]: CheckComponent,
  [Icons.hr]: HRComponent,
  [Icons.account]: AccountComponent,
  [Icons.notification]: NotificationComponent,
  [Icons.logout]: LogoutComponent,
  [Icons.add]: AddComponent,
  [Icons.arrowBack]: ArrowBackComponent,
};
