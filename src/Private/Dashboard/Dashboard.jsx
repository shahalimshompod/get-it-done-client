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
    <div className="mt-10 w-full h-[85vh]">
      <div className="flex items-center justify-between">
        <h1 className="text-5xl mb-6">
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
          <span className="font-semibold text-gray-500">Add tasks</span>
        </button>
      </div>

      {/* task container */}
      <div className="flex gap-6 rounded p-4">
        <Todo />
        <VitalTask />
        <div className="w-full flex flex-col justify-between">
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
