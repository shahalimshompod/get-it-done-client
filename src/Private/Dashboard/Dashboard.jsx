import { useContext, useState } from "react";
import Todo from "../Todo/Todo";
import { AuthContext } from "../../Authentication/AuthContext/AuthContextProvider";
import { IoMdAdd } from "react-icons/io";
import TaskModal from "../../Components/TaskModal/TaskModal";
import VitalTask from "../../Private/VitalTask/VitalTask";
import InProgress from "../../Private/InProgress/InProgress";
import CompletedTask from "../../Private/CompletedTask/CompletedTask";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { displayName } = user;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:mt-8 2xl:mt-10 w-full lg:h-[83vh] 2xl:h-[85vh]">
      <div className="flex flex-col lg:flex-row items-center justify-between">
        <h1 className="text-2xl my-3 lg:text-3xl 2xl:text-5xl 2xl:mb-6 w-11/12 lg:w-full text-center lg:text-left">
          <span className="montserrat">Welcome back</span>,{" "}
          <span className="italia">{displayName}</span>
          <span>👋</span>
        </h1>
        <button
          onClick={() => setIsOpen(true)}
          className="btn btn-ghost hover:border-none montserrat flex items-center gap-2"
        >
          <span className="text-[#FF6767]">
            <IoMdAdd size={25} />
          </span>{" "}
          <span className="font-semibold text-gray-500">Add new tasks</span>
        </button>
      </div>

      {/* task container */}
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-2 2xl:gap-6 rounded mb-10 lg:mb-0">
        <Todo />
        <VitalTask />
        <div className="w-full flex flex-col justify-between gap-8 2xl:gap-2">
          <InProgress />
          <CompletedTask />
        </div>
      </div>

      {/* Task Modal */}
      <TaskModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default Dashboard;
