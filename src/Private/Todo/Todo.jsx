import TaskCardContainer from "../../Components/TaskCardContainer/TaskCardContainer";
import { MdOutlinePendingActions } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const Todo = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div
      className={`w-full shadow-2xl p-5 rounded-3xl ${
        path == "/" ? "mt-0 h-[74vh]" : "mt-10 h-[85vh] overflow-y-scroll"
      }`}
    >
      <div className="flex items-center justify-between  mb-3">
        <div className="flex items-center justify-between w-full">
          <h1 className="flex items-center gap-2 text-xl">
            <span className="text-gray-400">
              <MdOutlinePendingActions size={25} />
            </span>
            <span className="montserrat font-semibold text-[#FF6767]">
              To do
            </span>
          </h1>

          {/* see all button */}

          <Link to="/tasks/to-do">
            <h3>View</h3>
          </Link>
        </div>
      </div>
      <div>
        <TaskCardContainer />
      </div>
    </div>
  );
};

export default Todo;
