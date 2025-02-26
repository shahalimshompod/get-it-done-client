import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import TaskCard from "../TaskCard/TaskCard";
import { AuthContext } from "../../Authentication/AuthContext/AuthContextProvider";
import useSocket from "../../hooks/useSocket";
import TaskUpdateModal from "../TaskUpdateModal/TaskUpdateModal";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useLocation } from "react-router-dom";
import taskLoading from "../../assets/loading-icons/planning.gif";
import noTask from "../../assets/images/no-task.png";

const TaskCardContainerCompleted = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedTask, setSelectedTask] = useState(null);
  const [completedTaskData, setCompletedTaskData] = useState([]);
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const location = useLocation();
  const path = location.pathname;
  const [loading, setLoading] = useState(false);

  // fetch data
  const fetchTaskData = async () => {
    setLoading(true);
    const res = await axiosSecure.get(`/completed-tasks?query=${email}`);
    if (res?.data) {
      const sortedData = res.data.sort((a, b) => a.order - b.order);
      setCompletedTaskData(sortedData);
      setLoading(false);
    }
  };

  // effect handle
  useEffect(() => {
    fetchTaskData();
  }, [email]);

  // socket
  useSocket("TaskAdded", (data) => {
    if (data.task_category === "completed" && data.email === email) {
      setCompletedTaskData((prev) => [data, ...prev]);
    }
  });

  // socket task deleted
  useSocket("TaskDeleted", (id) => {
    setCompletedTaskData((prev) => prev.filter((data) => data._id !== id));
    fetchTaskData();
  });

  // task update
  useSocket("TaskUpdate", (updatedData) => {
    if (updatedData.email === email) {
      if (updatedData.task_category !== "completed") {
        setCompletedTaskData((prev) =>
          prev.filter((task) => task._id !== updatedData._id)
        );
      } else {
        setCompletedTaskData((prev) =>
          prev.map((task) =>
            task._id === updatedData._id ? updatedData : task
          )
        );
      }
    }
  });

  useSocket("TaskUpdate", () => {
    fetchTaskData();
  });

  // socket task completed
  useSocket("TaskCompleted", (data) => {
    console.log(data);
    if (data.task_category === "completed") {
      setCompletedTaskData((prev) =>
        prev.filter((tasks) => tasks._id !== data.id)
      );
    }
    fetchTaskData();
  });

  useSocket("TaskCompleted", () => {});

  // Handle drag end event
  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const newOrder = [...completedTaskData];
    const [movedItem] = newOrder.splice(result.source.index, 1);
    newOrder.splice(result.destination.index, 0, movedItem);
    setCompletedTaskData(newOrder);

    // Update order in database
    await axiosSecure.patch("/update-task-order", {
      tasks: newOrder.map((task, index) => ({ _id: task._id, order: index })),
      email: user.email,
    });
  };

  // socket task order updated
  useSocket("TaskOrderUpdated", () => {
    fetchTaskData();
  });

  return (
    <div
      className={`overflow-y-scroll rounded-xl no-scrollbar ${
        path == "/"
          ? "h-[65vh] 2xl:h-[250px]"
          : " lg:h-[70vh] mt-0 2xl:h-[75vh] "
      }`}
    >
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="task-list">
          {(provided) => (
            <div
              className="grid grid-cols-1 gap-4"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {loading ? (
                <div
                  className={`w-full flex flex-col items-center justify-center ${
                    path === "/" ? "mt-20" : "h-[60vh]"
                  }`}
                >
                  <img className="w-20" src={taskLoading} alt="loading" />
                </div>
              ) : completedTaskData?.length > 0 ? (
                completedTaskData.map((data, idx) => (
                  <Draggable key={data._id} draggableId={data._id} index={idx}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TaskCard
                          setSelectedTask={setSelectedTask}
                          data={data}
                        />
                      </div>
                    )}
                  </Draggable>
                ))
              ) : (
                <div className="flex flex-col items-center justify-between text-black/50 mt-12">
                  <img
                    className="w-2/12 mb-5 opacity-70"
                    src={noTask}
                    alt="no tasks"
                  />
                  <h1 className="italia text-center text-4xl font-thin ">
                    No task completed!
                  </h1>
                </div>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <TaskUpdateModal
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
      />
    </div>
  );
};

export default TaskCardContainerCompleted;
