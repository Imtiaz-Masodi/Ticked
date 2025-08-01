import { NotificationType } from "./Notification.enum";

type NotificationProps = React.PropsWithChildren<{
  type?: NotificationType;
}>;

const typeStyles = Object.freeze({
  [NotificationType.SUCCESS]: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
  [NotificationType.ERROR]: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
  [NotificationType.WARNING]: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300",
  [NotificationType.INFO]: "bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300",
});

function Notification(props: NotificationProps) {
  const { type = NotificationType.INFO, children } = props;

  return (
    <div className={`px-4 py-2 rounded-sm text-sm ${typeStyles[type]}`}>
      {children}
    </div>
  );
}

export default Notification;
