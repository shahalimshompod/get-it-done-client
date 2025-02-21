import { BiTask } from "react-icons/bi";
import TaskCardContainerCompleted from "../../Components/TaskCardContainer/TaskCardContainerCompleted";

const CompletedTask = () => {
  return (
    <div className="w-full shadow-xl p-5 rounded-3xl mt-10">
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
