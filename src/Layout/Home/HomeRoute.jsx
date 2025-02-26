import { Outlet } from "react-router-dom";
import Sidebar from "../../Sections/Sidebar/Sidebar";

const HomeRoute = () => {
  return (
    <div className="flex gap-2 2xl:gap-20 px-2 lg:mr-2 lg:px-0 2xl:mr-20">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <Outlet />
    </div>
  );
};

export default HomeRoute;
