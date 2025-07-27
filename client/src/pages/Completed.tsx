import { authHelper } from "../helpers/authHelper";
import { TasksList } from "../sections/TasksList";
import { TaskStatus } from "../utils/enums";

function Completed() {
  const isUserLoggedIn = authHelper.isUserLoggedIn();

  if (!isUserLoggedIn) return null;

  return (
    <div className="mx-2 mt-2">
      <TasksList status={[TaskStatus.completed]} title="Completed Tasks" />
    </div>
  );
}

export default Completed;
