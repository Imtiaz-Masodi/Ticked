import { authHelper } from "../helpers/authHelper";
import { TasksList } from "../sections/TasksList";
import { TaskStatus } from "../utils/enums";

function Backlog() {
  const isUserLoggedIn = authHelper.isUserLoggedIn();

  if (!isUserLoggedIn) return null;

  return (
    <div className="mx-2 mt-2">
      <TasksList status={[TaskStatus.backlog]} title="Backlog Tasks" />
    </div>
  );
}

export default Backlog;
