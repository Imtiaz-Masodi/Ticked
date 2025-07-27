import { authHelper } from "../helpers/authHelper";
import { TasksList } from "../sections/TasksList";
import { TaskStatus } from "../utils/enums";

function Completed() {
  const isUserLoggedIn = authHelper.isUserLoggedIn();

  if (!isUserLoggedIn) return null;

  return (
    <div className="mx-2 mt-2">
      <TasksList
        title="Completed Tasks"
        status={TaskStatus.completed}
        leftAction={TaskStatus.inprogress}
        rightAction={TaskStatus.backlog}
      />
    </div>
  );
}

export default Completed;
