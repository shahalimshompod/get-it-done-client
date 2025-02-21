import { useContext, useState } from "react";
import Todo from "../Todo/Todo";
import { AuthContext } from "../../Authentication/AuthContext/AuthContextProvider";
import { IoMdAdd } from "react-icons/io";
import TaskModal from "../../Components/TaskModal/TaskModal";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { displayName } = user;

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mt-10 w-full">
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
      <div className="flex gap-6 border-2 rounded border-gray-400 p-4">
        <Todo />
        <Todo />
      </div>

      {/* Task Modal */}
      <TaskModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default Dashboard;
