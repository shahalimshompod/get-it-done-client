import { TbAlertTriangleFilled } from "react-icons/tb";
import TaskCardContainerVitalTask from "../../Components/TaskCardContainer/TaskCardContainerVitalTask";

const VitalTask = () => {
  return (
    <div className="w-full shadow-xl p-5 rounded-3xl mt-10">
      <div className="flex items-center justify-between  mb-3">
        <h1 className="flex items-center gap-2 text-xl">
          <span className="text-gray-400">
            <TbAlertTriangleFilled size={22} />
          </span>
          <span className="montserrat font-semibold text-[#FF6767]">
            Vital Tasks
          </span>
        </h1>
      </div>
      <div>
        <TaskCardContainerVitalTask />
      </div>
    </div>
  );
};

export default VitalTask;
