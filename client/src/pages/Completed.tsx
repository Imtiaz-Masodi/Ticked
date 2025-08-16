import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authHelper } from "../helpers/authHelper";

function Completed() {
  const navigate = useNavigate();
  const isUserLoggedIn = authHelper.isUserLoggedIn();

  useEffect(() => {
    if (isUserLoggedIn) {
      // Redirect to the new tasks route with completed status
      navigate("/tasks/completed", { replace: true });
    }
  }, [isUserLoggedIn, navigate]);

  if (!isUserLoggedIn) return null;

  // This component will redirect, so return null to avoid flash
  return null;
}

export default Completed;
