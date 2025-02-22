import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import TaskCard from "../TaskCard/TaskCard";
import { AuthContext } from "../../Authentication/AuthContext/AuthContextProvider";
import useSocket from "../../hooks/useSocket";
import TaskUpdateModal from "../TaskUpdateModal/TaskUpdateModal";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useLocation } from "react-router-dom";

const TaskCardContainerVitalTask = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedTask, setSelectedTask] = useState(null);
  const [vitalTaskData, setVitalTaskData] = useState([]);
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const location = useLocation();
  const path = location.pathname;

  // fetch data
  const fetchTaskData = async () => {
    const res = await axiosSecure.get(`/vital-tasks?query=${email}`);
    if (res?.data) {
      const sortedData = res.data.sort((a, b) => a.order - b.order);
      setVitalTaskData(sortedData);
    }
  };

  // effect handle
  useEffect(() => {
    fetchTaskData();
  }, [email]);

  // Socket.IO Events
  //   task add
  useSocket("TaskAdded", (data) => {
    if (data.email === email && data.task_priority === "extreme") {
      setVitalTaskData((prev) => [data, ...prev]);
    }
  });

  //   task delete
  useSocket("TaskDeleted", (id) => {
    setVitalTaskData((prev) => prev.filter((data) => data._id !== id));
  });

  //   task update
  useSocket("TaskUpdate", (updatedData) => {
    if (updatedData.email === email) {
      if (updatedData.old_priority !== updatedData.task_priority) {
        if (updatedData.old_priority === "extreme") {
          setVitalTaskData((prev) =>
            prev.filter((task) => task._id !== updatedData._id)
          );
        }
      } else {
        if (updatedData.task_priority === "extreme") {
          setVitalTaskData((prev) =>
            prev.map((task) =>
              task._id === updatedData._id ? updatedData : task
            )
          );
        }
      }
    }
  });

  // socket task completed
  useSocket("TaskCompleted", (data) => {
    if (data.task_category === "completed") {
      setVitalTaskData((prev) => prev.filter((tasks) => tasks._id !== data.id));
    }
  });

  useSocket("TaskUpdate", () => {
    fetchTaskData();
  });

  // Handle drag end event
  const handleDragEnd = async (result) => {
    // console.log(result);
    if (!result.destination) return;

    const newOrder = [...vitalTaskData];
    const [movedItem] = newOrder.splice(result.source.index, 1);
    newOrder.splice(result.destination.index, 0, movedItem);
    setVitalTaskData(newOrder);

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
        path == "/" ? "h-[65vh]" : " mt-0 h-[75vh] "
      }`}
    >
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="task-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {vitalTaskData.map((data, idx) => (
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

export default TaskCardContainerVitalTask;
