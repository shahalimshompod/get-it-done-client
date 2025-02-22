import { GrInProgress } from "react-icons/gr";
import TaskCardContainerInProgress from "../../Components/TaskCardContainer/TaskCardContainerInProgress";
import { useLocation } from "react-router-dom";

const InProgress = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div
      className={`w-full  p-5 rounded-3xl  ${
        path == "/"
          ? "mt-0 h-[340px] shadow-xl"
          : "mt-10 h-[85vh] overflow-y-scroll shadow-2xl"
      }`}
    >
      <div className="flex items-center justify-between  mb-3">
        <h1 className="flex items-center gap-2 text-xl">
          <span className="text-gray-400">
            <GrInProgress size={25} />
          </span>
          <span className="montserrat font-semibold text-[#FF6767]">
            In Progress
          </span>
        </h1>
      </div>
      <div>
        <TaskCardContainerInProgress />
      </div>
    </div>
  );
};

export default InProgress;
