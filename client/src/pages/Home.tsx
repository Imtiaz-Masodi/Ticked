import { authHelper } from "../helpers/authHelper";
import { useNavigate } from "react-router-dom";
import { FloatingActionButton } from "../components/FloatingActionButton";
import { Icons } from "../components/Icon/IconMap";
import { TasksList } from "../sections/TasksList";
import { TaskStatus } from "../utils/enums";

function Home() {
  const navigate = useNavigate();
  const isUserLoggedIn = authHelper.isUserLoggedIn();

  if (!isUserLoggedIn) return null;

  return (
    <div className="mx-2 mt-2">
      <TasksList status={[TaskStatus.todo, TaskStatus.inprogress]} title="Active Tasks" />
      <FloatingActionButton
        icon={Icons.add}
        onClick={() => navigate("/task/new")}
      />
    </div>
  );
}

export default Home;
