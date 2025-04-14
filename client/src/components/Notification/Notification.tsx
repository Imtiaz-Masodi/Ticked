import { NotificationType } from "./Notification.enum";

type NotificationProps = React.PropsWithChildren<{
  type?: NotificationType;
}>;

const typeStyles = Object.freeze({
  [NotificationType.SUCCESS]: "bg-green-100 text-green-700",
  [NotificationType.ERROR]: "bg-red-100 text-red-700",
  [NotificationType.WARNING]: "bg-yellow-100 text-yellow-700",
  [NotificationType.INFO]: "bg-sky-100 text-sky-700",
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
