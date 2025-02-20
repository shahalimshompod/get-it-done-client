import Sidebar from "../../Sections/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Root;
