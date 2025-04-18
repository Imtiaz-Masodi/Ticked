import { useEffect } from "react";
import { authHelper } from "../helpers/authHelper";
import { useNavigate } from "react-router-dom";
import { FloatingActionButton } from "../components/FloatingActionButton";
import { Icons } from "../components/Icon/IconMap";
import { TasksList } from "../sections/TasksList";

function Home() {
  const navigate = useNavigate();
  const isUserLoggedIn = authHelper.isUserLoggedIn();

  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate("/login");
    }
  }, [isUserLoggedIn, navigate]);

  if (!isUserLoggedIn) return null;

  return (
    <div className="mt-2">
      <TasksList />
      <FloatingActionButton icon={Icons.add} onClick={() => navigate("/task/new")} />
    </div>
  );
}

export default Home;
