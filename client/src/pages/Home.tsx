import { useEffect } from "react";
import { authHelper } from "../helpers/authHelper";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import FloatingActionButton from "../components/FloatingActionButton/FloatingActionButton";
import { Icons } from "../components/Icon/IconMap";

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
      <Header />
      <p className="text-3xl font-bold text-stone-700">Home page under development</p>

      <FloatingActionButton icon={Icons.add} onClick={() => navigate("/task/new")} />
    </div>
  );
}

export default Home;
