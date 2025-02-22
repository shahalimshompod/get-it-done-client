import { BiTask } from "react-icons/bi";
import TaskCardContainerCompleted from "../../Components/TaskCardContainer/TaskCardContainerCompleted";
import { useLocation } from "react-router-dom";

const CompletedTask = () => {
  const location = useLocation();
  const path = location.pathname;
  return (
    <div
      className={`w-full p-5 rounded-3xl  ${
        path == "/" ? "mt-0 h-[340px] shadow-2xl" : "mt-10 h-[85vh] overflow-y-scroll shadow-2xl"
      }`}
    >
      <div className="flex items-center justify-between  mb-3">
        <h1 className="flex items-center gap-2 text-xl">
          <span className="text-gray-400">
            <BiTask size={22} />
          </span>
          <span className="montserrat font-semibold text-[#FF6767]">
            Completed Tasks
          </span>
        </h1>
      </div>
      <div>
        <TaskCardContainerCompleted />
      </div>
    </div>
  );
};

export default CompletedTask;
