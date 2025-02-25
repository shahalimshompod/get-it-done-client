import { NavLink } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { TbAlertTriangleFilled } from "react-icons/tb";
import { FaTasks } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { MdOutlinePendingActions } from "react-icons/md";
import { GrInProgress } from "react-icons/gr";
import { BiTask } from "react-icons/bi";
import { useContext } from "react";
import { AuthContext } from "../../Authentication/AuthContext/AuthContextProvider";
import toast from "react-hot-toast";

const Sidebar = () => {
  const { user, userLogout } = useContext(AuthContext);
  const { displayName, email, photoURL } = user;

  const handleLogout = () => {
    userLogout();
    if (user?.email) {
      toast.success("Successfully Logged out!");
    }
  };
  return (
    <div className="bg-[#FF6767] lg:h-[83vh] lg:w-64 2xl:w-80 2xl:h-[85vh] sticky top-36 flex flex-col p-6 rounded-tr-xl rounded-br-xl text-white mt-10">
      {/* Profile Section */}
      <div className="flex flex-col items-center lg:mb-3 2xl:mb-8 relative">
        <div className="lg:w-16 lg:h-16 2xl:w-24 2xl:h-24 overflow-hidden rounded-full border-4 border-white absolute -top-15">
          <img
            className="w-full h-full object-cover"
            src={photoURL}
            alt="User"
          />
        </div>
        <div className="flex flex-col items-center 2xl:mt-7">
          <h2 className="2xl:mt-4 lg:text-xl 2xl:text-2xl montserrat font-semibold text-center ">
            {displayName}
          </h2>
          <p className="text-sm montserrat text-white">{email}</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="w-full flex-1">
        <ul className="space-y-2">
          <li>
            <NavLink
              end
              to="/"
              className={({ isActive }) =>
                `flex items-center lg:p-2 2xl:p-3 rounded-xl transition duration-300 montserrat 2xl:text-xl ${
                  isActive ? "bg-[#fff] text-[#FF4C4C]" : "hover:bg-[#fff]/20"
                }`
              }
            >
              <p className="ml-2 flex items-center gap-2">
                <span>
                  <MdSpaceDashboard size={25} />
                </span>
                <span>Dashboard</span>
              </p>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/tasks/vital-task"
              className={({ isActive }) =>
                `flex items-center lg:p-2 2xl:p-3 rounded-lg transition duration-300 montserrat 2xl:text-xl ${
                  isActive ? "bg-[#fff] text-[#FF4C4C]" : "hover:bg-[#fff]/20"
                }`
              }
            >
              <p className="ml-2 flex items-center gap-2">
                <span>
                  <TbAlertTriangleFilled size={22} />
                </span>
                <span>Vital Tasks</span>
              </p>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/tasks/my-tasks"
              className={({ isActive }) =>
                `flex items-center lg:p-2 2xl:p-3 rounded-lg transition duration-300 montserrat 2xl:text-xl ${
                  isActive ? "bg-[#fff] text-[#FF4C4C]" : "hover:bg-[#fff]/20"
                }`
              }
            >
              <p className="ml-2 flex items-center gap-2">
                <span>
                  <FaTasks size={22} />
                </span>
                <span>My Tasks</span>
              </p>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/tasks/to-do"
              className={({ isActive }) =>
                `flex items-center lg:p-2 2xl:p-3 rounded-lg transition duration-300 montserrat 2xl:text-xl ${
                  isActive ? "bg-[#fff] text-[#FF4C4C]" : "hover:bg-[#fff]/20"
                }`
              }
            >
              <p className="ml-2 flex items-center gap-2">
                <span>
                  <MdOutlinePendingActions size={25} />
                </span>
                <span>To do</span>
              </p>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/tasks/in-progress"
              className={({ isActive }) =>
                `flex items-center lg:p-2 2xl:p-3 rounded-lg transition duration-300 montserrat 2xl:text-xl ${
                  isActive ? "bg-[#fff] text-[#FF4C4C]" : "hover:bg-[#fff]/20"
                }`
              }
            >
              <p className="ml-2 flex items-center gap-2">
                <span>
                  <GrInProgress size={22} />
                </span>
                <span>In Progress</span>
              </p>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/tasks/completed"
              className={({ isActive }) =>
                `flex items-center lg:p-2 2xl:p-3 rounded-lg transition duration-300 montserrat 2xl:text-xl ${
                  isActive ? "bg-[#fff] text-[#FF4C4C]" : "hover:bg-[#fff]/20"
                }`
              }
            >
              <p className="ml-2 flex items-center gap-2">
                <span>
                  <BiTask size={22} />
                </span>
                <span>Completed Tasks</span>
              </p>
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="w-full p-2 2xl:p-3 rounded-lg text-left cursor-pointer montserrat hover:bg-[#fff]/20 transition duration-300 flex items-center gap-2 2xl:text-xl"
        >
          <span>
            <LuLogOut />
          </span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
