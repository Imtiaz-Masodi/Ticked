import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "../../components/Header/Header";
import { NavigationDrawer } from "../../components/NavigationDrawer";

function RootContainer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleToggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  return (
    <div id="root-container" className="min-h-screen bg-zinc-50">
      <Header onMenuIconClick={handleToggleDrawer} />
      <NavigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
      <div className="py-16 md:pl-64 container mx-auto transition-all duration-300">
        <Outlet />
      </div>
    </div>
  );
}

export default RootContainer;
