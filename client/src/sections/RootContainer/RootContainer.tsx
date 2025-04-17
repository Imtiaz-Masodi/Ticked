import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";

function RootContainer() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <Header />
      <div className="py-16 container mx-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default RootContainer;
