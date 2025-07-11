import { TbAlertTriangleFilled } from "react-icons/tb";
import TaskCardContainerVitalTask from "../../Components/TaskCardContainer/TaskCardContainerVitalTask";
import { Link, useLocation } from "react-router-dom";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

const VitalTask = () => {
  const location = useLocation();
  const path = location.pathname;

  // Handle drag end event
  const handleDragEnd = async () => {
    // result
    // console.log("success");
    // if (!result.destination) return;

    // const newOrder = [...vitalTaskData];
    // const [movedItem] = newOrder.splice(result.source.index, 1);
    // newOrder.splice(result.destination.index, 0, movedItem);
    // setVitalTaskData(newOrder);

    // // Update order in database
    // await axiosSecure.patch("/update-task-order", {
    //   tasks: newOrder.map((task, index) => ({ _id: task._id, order: index })),
    //   email: user.email,
    // });
  };

  return (
    <div
      className={`w-full shadow-xl lg:shadow-2xl p-2 lg:p-3 2xl:p-5 rounded-2xl lg:rounded-3xl ${
        path == "/"
          ? "mt-0 lg:h-[74vh] 2xl:h-[75vh] "
          : "mt-10 lg:h-[83vh] 2xl:h-[85vh] "
      }`}
    >
      <div className="flex items-center justify-between  mb-3">
        <div className="flex items-center justify-between w-full">
          <h1 className="flex items-center gap-2 text-xl">
            <span className="text-gray-400">
              <TbAlertTriangleFilled size={22} />
            </span>
            <span className="montserrat font-semibold text-[#FF6767]">
              Vital Tasks
            </span>
          </h1>
          {path === "/" && (
            <Link
              to="/tasks/vital-task"
              className="montserrat text-[#FF6767] border px-2 rounded-2xl hover:bg-[#FF6767]/15"
            >
              <h3>View</h3>
            </Link>
          )}
        </div>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="task-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <TaskCardContainerVitalTask />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default VitalTask;
