import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TASK_ROUTES } from "../utils";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(TASK_ROUTES.TASKS_ALL);
  }, [navigate]);

  return null;
}

export default Home;
