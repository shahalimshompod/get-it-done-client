import { BiTask } from "react-icons/bi";
import TaskCardContainerCompleted from "../../Components/TaskCardContainer/TaskCardContainerCompleted";
import { Link, useLocation } from "react-router-dom";

const CompletedTask = () => {
  const location = useLocation();
  const path = location.pathname;
  return (
    <div
      className={`w-full p-2 lg:p-3 2xl:p-5 rounded-2xl lg:rounded-3xl   ${
        path == "/"
          ? "mt-0 h-full  2xl:h-[340px] shadow-2xl lg:hidden 2xl:block"
          : "mt-10 lg:h-[83vh] 2xl:h-[85vh] shadow-2xl"
      }`}
    >
      <div className="flex items-center justify-between  mb-3">
        <div className="flex items-center justify-between w-full">
          <h1 className="flex items-center gap-2 text-xl">
            <span className="text-gray-400">
              <BiTask size={22} />
            </span>
            <span className="montserrat font-semibold text-[#FF6767]">
              Completed Tasks
            </span>
          </h1>
          {path === "/" && (
            <Link
              to="/tasks/completed"
              className="montserrat text-[#FF6767] border px-2 rounded-2xl hover:bg-[#FF6767]/15"
            >
              <h3>View</h3>
            </Link>
          )}
        </div>
      </div>
      <div>
        <TaskCardContainerCompleted />
      </div>
    </div>
  );
};

export default CompletedTask;
