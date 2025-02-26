import TaskCardContainer from "../../Components/TaskCardContainer/TaskCardContainer";
import { MdOutlinePendingActions } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const Todo = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div
      className={`w-full shadow-xl lg:shadow-2xl p-2 lg:p-3 2xl:p-5 rounded-2xl lg:rounded-3xl ${
        path == "/"
          ? "mt-0 lg:h-[74vh] 2xl:h-[75vh]"
          : "mt-10 lg:h-[83vh] 2xl:h-[85vh]"
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

          {path === "/" && (
            <Link
              to="/tasks/to-do"
              className="montserrat text-[#FF6767] border px-2 rounded-2xl hover:bg-[#FF6767]/15"
            >
              <h3>View</h3>
            </Link>
          )}
        </div>
      </div>
      <div>
        <TaskCardContainer />
      </div>
    </div>
  );
};

export default Todo;
