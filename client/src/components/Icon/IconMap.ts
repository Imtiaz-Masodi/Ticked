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
import DownComponent from "../../assets/svg/down.svg";
import ArchiveComponent from "../../assets/svg/archive.svg";
import CategoryComponent from "../../assets/svg/category.svg";
import DeleteComponent from "../../assets/svg/delete.svg";
import LabelComponent from "../../assets/svg/label.svg";
import MenuComponent from "../../assets/svg/menu.svg";
import TaskDoneComponent from "../../assets/svg/task_done.svg";
import TaskComponent from "../../assets/svg/task.svg";
import CloudComponent from "../../assets/svg/cloud.svg";
import CloudOffComponent from "../../assets/svg/cloud_off.svg";
import CloudUploadComponent from "../../assets/svg/cloud_upload.svg";
import NewTaskComponent from "../../assets/svg/new_task.svg";
import CloseComponent from "../../assets/svg/close.svg";
import InfoComponent from "../../assets/svg/info.svg";
import ErrorComponent from "../../assets/svg/error.svg";
import WarningComponent from "../../assets/svg/warning.svg";

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
  down = "down",
  archive = "archive",
  category = "category",
  delete = "delete",
  label = "label",
  menu = "menu",
  task = "task",
  taskDone = "task-done",
  cloud = "cloud",
  cloudOff = "cloud-off",
  cloudUpload = "cloud-upload",
  newTask = "new-task",
  close = "close",
  info = "info",
  error = "error",
  warning = "warning",
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
  [Icons.down]: DownComponent,
  [Icons.archive]: ArchiveComponent,
  [Icons.category]: CategoryComponent,
  [Icons.delete]: DeleteComponent,
  [Icons.label]: LabelComponent,
  [Icons.menu]: MenuComponent,
  [Icons.task]: TaskComponent,
  [Icons.taskDone]: TaskDoneComponent,
  [Icons.cloud]: CloudComponent,
  [Icons.cloudOff]: CloudOffComponent,
  [Icons.cloudUpload]: CloudUploadComponent,
  [Icons.newTask]: NewTaskComponent,
  [Icons.close]: CloseComponent,
  [Icons.info]: InfoComponent,
  [Icons.error]: ErrorComponent,
  [Icons.warning]: WarningComponent,
};
