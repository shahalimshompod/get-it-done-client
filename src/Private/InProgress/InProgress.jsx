import { GrInProgress } from "react-icons/gr";
import TaskCardContainerInProgress from "../../Components/TaskCardContainer/TaskCardContainerInProgress";

const InProgress = () => {
  return (
    <div className="w-full shadow-xl p-5 rounded-3xl mt-10">
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
