import { NavLink } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { TbAlertTriangleFilled } from "react-icons/tb";
import { FaTasks } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { MdCategory } from "react-icons/md";
import { MdOutlinePendingActions } from "react-icons/md";
import { GrInProgress } from "react-icons/gr";
import { BiTask } from "react-icons/bi";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { SlCalender } from "react-icons/sl";
import { useContext, useState } from "react";
import { AuthContext } from "../../Authentication/AuthContext/AuthContextProvider";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, userLogout } = useContext(AuthContext);
  const { photoURL } = user;
  const [cal, setCal] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false); // State to toggle calendar visibility
  const today = new Date();
  const day = today.toLocaleDateString("en-US", { weekday: "long" });
  const date = today.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar); // Toggle calendar visibility
  };

  const handleLogout = () => {
    userLogout();
    if (user?.email) {
      toast.success("Successfully Logged out!");
    }
  };

  return (
    <div className="navbar bg-[#F8F8F8] shadow-sm 2xl:py-5 px-2 lg:px-14 sticky top-0 z-50">
      <div className="flex-1">
        <a
          href="/"
          className="text-xl lg:text-2xl 2xl:text-3xl font-black italia"
        >
          Getit<span className="text-[#FF6767]">done</span>
        </a>
      </div>
      <div className="flex items-center gap-5">
        <div className="relative">
          <button
            onClick={toggleCalendar} // Use the toggle function
            className="btn rounded-xl text-white bg-[#FF6767] border-none shadow-2xl"
          >
            <SlCalender size={18} />
          </button>
          {showCalendar && ( // Conditionally render the calendar
            <div className="absolute top-12 -right-14 z-50">
              <Calendar
                value={cal}
                onChange={(date) => {
                  setCal(date);
                  setShowCalendar(false); // Close the calendar after selecting a date
                }}
              />
            </div>
          )}
        </div>

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component" src={photoURL} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow lg:hidden"
          >
            <li>
              <NavLink
                end
                to="/"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-xl transition duration-300 montserrat text-sm ${
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
                  `flex items-center p-3 rounded-lg transition duration-300 montserrat text-sm ${
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
                  `flex items-center p-3 rounded-lg transition duration-300 montserrat text-sm ${
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
                  `flex items-center p-3 rounded-lg transition duration-300 montserrat text-sm ${
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
                  `flex items-center p-3 rounded-lg transition duration-300 montserrat text-sm ${
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
                  `flex items-center p-3 rounded-lg transition duration-300 montserrat text-sm ${
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
            <li>
              <button
                onClick={handleLogout}
                className="w-full p-3 rounded-lg text-left cursor-pointer montserrat hover:bg-[#fff]/20 transition duration-300 flex items-center gap-2 text-xl"
              >
                <span>
                  <LuLogOut />
                </span>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>

        <div className="hidden md:block">
          <h1 className="montserrat font-semibold lg:text-lg 2xl:text-xl">
            {day}
          </h1>
          <p className="text-base montserrat text-[#3ABEFF] lg:text-sm 2xl:text-base">
            {date}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
