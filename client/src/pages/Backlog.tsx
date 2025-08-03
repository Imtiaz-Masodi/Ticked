import { authHelper } from "../helpers/authHelper";
import { TasksList } from "../sections/TasksList";
import { TaskStatus } from "../utils/enums";

function Backlog() {
  const isUserLoggedIn = authHelper.isUserLoggedIn();

  if (!isUserLoggedIn) return null;

  return (
    <div className="mx-0 md:mx-2 mt-2">
      <TasksList
        title="Backlog Tasks"
        status={TaskStatus.backlog}
        leftAction={TaskStatus.todo}
      />
    </div>
  );
}

export default Backlog;
