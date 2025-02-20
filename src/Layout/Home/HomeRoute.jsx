import { Outlet } from "react-router-dom";
import Sidebar from "../../Sections/Sidebar/Sidebar";

const HomeRoute = () => {
  return (
    <div className="flex gap-10">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default HomeRoute;
