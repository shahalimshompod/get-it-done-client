import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import TaskCard from "../TaskCard/TaskCard";
import { AuthContext } from "../../Authentication/AuthContext/AuthContextProvider";
import useSocket from "../../hooks/useSocket";
import TaskUpdateModal from "../TaskUpdateModal/TaskUpdateModal";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useLocation } from "react-router-dom";

const TaskCardContainerInProgress = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedTask, setSelectedTask] = useState(null);
  const [inProgressData, setInProgressData] = useState([]);
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const location = useLocation();
  const path = location.pathname;

  console.log(inProgressData);

  // fetch data
  const fetchTaskData = async () => {
    const res = await axiosSecure.get(`/in-progress-tasks?query=${email}`);
    if (res?.data) {
      const sortedData = res.data.sort((a, b) => a.order - b.order);
      setInProgressData(sortedData);
    }
  };

  // effect handle
  useEffect(() => {
    fetchTaskData();
  }, []);

  // socket
  useSocket("TaskAdded", (data) => {
    // fetchTaskData()
    if (data.task_category === "in progress" && data.email === email) {
      setInProgressData((prev) => [data, ...prev]);
    }
  });

  //   socket task deleted
  useSocket("TaskDeleted", (id) => {
    setInProgressData((prev) => prev.filter((data) => data._id !== id));
  });

  // task update
  useSocket("TaskUpdate", (updatedData) => {
    if (updatedData.email === email) {
      if (updatedData.task_category !== "in progress") {
        // If task is no longer "not started", remove it from the list
        setInProgressData((prev) =>
          prev.filter((task) => task._id !== updatedData._id)
        );
      } else {
        // If task is still "not started", update it in the list
        setInProgressData((prev) =>
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
    if (data.task_category === "completed") {
      setInProgressData((prev) =>
        prev.filter((tasks) => tasks._id !== data.id)
      );
    }
  });

  // Handle drag end event
  const handleDragEnd = async (result) => {
    // console.log(result);
    if (!result.destination) return;

    const newOrder = [...inProgressData];
    const [movedItem] = newOrder.splice(result.source.index, 1);
    newOrder.splice(result.destination.index, 0, movedItem);
    setInProgressData(newOrder);

    // Update order in database
    await axiosSecure.patch("/update-task-order", {
      tasks: newOrder.map((task, index) => ({ _id: task._id, order: index })),
      email: user.email,
    });
  };

  // socket task order updated
  useSocket("TaskOrderUpdated", () => {
    fetchTaskData;
  });

  return (
    <div
      className={`overflow-y-scroll rounded-xl no-scrollbar  ${
        path == "/" ? "h-[250px]" : " mt-0 h-[75vh] "
      }`}
    >
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="task-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {inProgressData.map((data, idx) => (
                <Draggable key={data._id} draggableId={data._id} index={idx}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TaskCard setSelectedTask={setSelectedTask} data={data} />
                    </div>
                  )}
                </Draggable>
              ))}
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

export default TaskCardContainerInProgress;
