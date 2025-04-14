import { useEffect } from "react";
import { AppLogo } from "../../components/AppLogo";
import { authHelper } from "../../helpers/authHelper";
import { useNavigate } from "react-router-dom";

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
    <div className="w-screen h-screen flex flex-col gap-6 justify-center items-center">
      <AppLogo />
      <p className="text-3xl font-bold text-stone-700">
        Home page under development
      </p>
    </div>
  );
}

export default Home;
