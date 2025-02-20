import TaskCardContainer from "../../Components/TaskCardContainer/TaskCardContainer";
import { MdOutlinePendingActions } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

const Todo = () => {
  return (
    <div className="w-full shadow-xl p-5 rounded-3xl">
      <div className="flex items-center justify-between  mb-3">
        <h1 className="flex items-center gap-2 text-xl">
          <span className="text-gray-400">
            <MdOutlinePendingActions size={25} />
          </span>
          <span className="montserrat font-semibold text-[#FF6767]">To do</span>
        </h1>
        <button className="btn btn-ghost hover:border-none  montserrat flex items-center gap-2">
          <span className="text-[#FF6767]">
            <IoMdAdd size={25} />
          </span>{" "}
          <span className=" font-semibold text-gray-500">Add tasks</span>
        </button>
      </div>
      <div>
        <TaskCardContainer />
      </div>
    </div>
  );
};

export default Todo;
