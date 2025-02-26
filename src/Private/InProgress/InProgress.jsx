import { GrInProgress } from "react-icons/gr";
import TaskCardContainerInProgress from "../../Components/TaskCardContainer/TaskCardContainerInProgress";
import { Link, useLocation } from "react-router-dom";

const InProgress = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div
      className={`w-full p-2 lg:p-3 2xl:p-5 rounded-2xl lg:rounded-3xl  ${
        path == "/"
          ? "mt-0 lg:h-[74vh] 2xl:h-[370px] shadow-xl"
          : "mt-10 lg:h-[83vh] 2xl:h-[85vh] shadow-2xl"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center justify-between w-full">
          <h1 className="flex items-center gap-2 text-xl">
            <span className="text-gray-400">
              <GrInProgress size={25} />
            </span>
            <span className="montserrat font-semibold text-[#FF6767]">
              In Progress
            </span>
          </h1>
          {path === "/" && (
            <Link
              to="/tasks/in-progress"
              className="montserrat text-[#FF6767] border px-2 rounded-2xl hover:bg-[#FF6767]/15"
            >
              <h3>View</h3>
            </Link>
          )}
        </div>
      </div>
      <div>
        <TaskCardContainerInProgress />
      </div>
    </div>
  );
};

export default InProgress;
