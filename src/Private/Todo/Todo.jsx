import TaskCardContainer from "../../Components/TaskCardContainer/TaskCardContainer";
import { MdOutlinePendingActions } from "react-icons/md";
import { useLocation } from "react-router-dom";

const Todo = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div
      className={`w-full shadow-xl p-5 rounded-3xl ${
        path == "/" ? "mt-0" : "mt-10"
      }`}
    >
      <div className="flex items-center justify-between  mb-3">
        <h1 className="flex items-center gap-2 text-xl">
          <span className="text-gray-400">
            <MdOutlinePendingActions size={25} />
          </span>
          <span className="montserrat font-semibold text-[#FF6767]">To do</span>
        </h1>
      </div>
      <div>
        <TaskCardContainer />
      </div>
    </div>
  );
};

export default Todo;
