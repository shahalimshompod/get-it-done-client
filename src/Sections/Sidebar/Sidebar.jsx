import { NavLink } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { TbAlertTriangleFilled } from "react-icons/tb";
import { FaTasks } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { MdCategory } from "react-icons/md";
import { MdOutlinePendingActions } from "react-icons/md";
import { GrInProgress } from "react-icons/gr";
import { BiTask } from "react-icons/bi";

const Sidebar = () => {
  return (
    <div className="bg-[#FF6767] w-80 h-[88vh] sticky top-32 flex flex-col p-6 rounded-tr-xl rounded-br-xl text-white mt-10">
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-8 relative">
        <div className="w-24 h-24 overflow-hidden rounded-full border-4 border-white absolute -top-15">
          <img
            className="w-full h-full object-cover"
            src="https://imgv3.fotor.com/images/blog-cover-image/a-shadow-of-a-boy-carrying-the-camera-with-red-sky-behind.jpg"
            alt="User"
          />
        </div>
        <div className="flex flex-col items-center mt-7">
          <h2 className="mt-4 text-2xl montserrat font-semibold ">John Doe</h2>
          <p className="text-sm montserrat text-white">john.doe@example.com</p>
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
                `flex items-center p-3 rounded-xl transition duration-300 montserrat text-xl ${
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
                `flex items-center p-3 rounded-lg transition duration-300 montserrat text-xl ${
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
                `flex items-center p-3 rounded-lg transition duration-300 montserrat text-xl ${
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
              to="/tasks/task-categories"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg transition duration-300 montserrat text-xl ${
                  isActive ? "bg-[#fff] text-[#FF4C4C]" : "hover:bg-[#fff]/20"
                }`
              }
            >
              <p className="ml-2 flex items-center gap-2">
                <span>
                  <MdCategory size={22} />
                </span>
                <span>Task Categories</span>
              </p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tasks/to-do"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg transition duration-300 montserrat text-xl ${
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
                `flex items-center p-3 rounded-lg transition duration-300 montserrat text-xl ${
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
                `flex items-center p-3 rounded-lg transition duration-300 montserrat text-xl ${
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
        <button className="w-full p-3 rounded-lg text-left cursor-pointer montserrat hover:bg-[#fff]/20 transition duration-300 flex items-center gap-2 text-xl">
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
