import { IoMdAdd } from "react-icons/io";
import { FaTasks } from "react-icons/fa";
import TaskCardContainerAllTask from "../../Components/TaskCardContainer/TaskCardContainerAllTask";
import TaskModal from "../../Components/TaskModal/TaskModal";
import { useState } from "react";

const AllTask = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full shadow-xl p-2 lg:p-3 2xl:p-5 rounded-2xl lg:rounded-3xl mt-10 lg:h-[83vh] 2xl:h-[85vh]">
      <div className="flex items-center justify-between  mb-3">
        <h1 className="flex items-center gap-2 text-xl">
          <span className="text-gray-400">
            <FaTasks size={25} />
          </span>
          <span className="montserrat font-semibold text-[#FF6767]">
            All Tasks
          </span>
        </h1>
        <button
          onClick={() => setIsOpen(true)}
          className="btn btn-ghost hover:border-none  montserrat flex items-center gap-2"
        >
          <span className="text-[#FF6767]">
            <IoMdAdd size={25} />
          </span>{" "}
          <span className=" font-semibold text-gray-500">Add new tasks</span>
        </button>
      </div>
      <div>
        <TaskCardContainerAllTask />
      </div>
      <TaskModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default AllTask;
