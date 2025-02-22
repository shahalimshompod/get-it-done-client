import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import TaskCard from "../TaskCard/TaskCard";
import { AuthContext } from "../../Authentication/AuthContext/AuthContextProvider";
import useSocket from "../../hooks/useSocket";
import TaskUpdateModal from "../../Components/TaskUpdateModal/TaskUpdateModal";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const TaskCardContainerAllTask = () => {
  const axiosSecure = useAxiosSecure();
  const [allTaskData, setAllTaskData] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const { user } = useContext(AuthContext);
  const email = user?.email;

  // fetch data
  const fetchTaskData = async () => {
    const res = await axiosSecure.get(`/all-tasks?query=${email}`);
    if (res?.data) {
      const sortedData = res.data.sort((a, b) => a.order - b.order);
      setAllTaskData(sortedData);
    }
  };

  // effect handle
  useEffect(() => {
    fetchTaskData();
  }, [email]);

  // socket
  useSocket("TaskAdded", (data) => {
    if (data.email === email && data.task_category !== "completed") {
      setAllTaskData((prev) => [data, ...prev]);
    }
  });

  // socket task deleted
  useSocket("TaskDeleted", (id) => {
    setAllTaskData((prev) => prev.filter((data) => data._id !== id));
  });

  // task update
  useSocket("TaskUpdate", (updatedData) => {
    if (updatedData.email === email) {
      if (updatedData.task_category === "completed") {
        // If task is completed, remove it from the list
        setAllTaskData((prev) =>
          prev.filter((task) => task._id !== updatedData._id)
        );
      } else {
        // If task is not completed, update it in the list
        setAllTaskData((prev) =>
          prev.map((task) =>
            task._id === updatedData._id ? updatedData : task
          )
        );
      }
    }
  });

  // socket task completed
  useSocket("TaskCompleted", (data) => {
    if (data.task_category === "completed") {
      setAllTaskData((prev) => prev.filter((tasks) => tasks._id !== data.id));
    }
  });

  useSocket("TaskUpdate", () => {
    fetchTaskData();
  });

  // Handle drag end event
  const handleDragEnd = async (result) => {
    // console.log(result);
    if (!result.destination) return;

    const newOrder = [...allTaskData];
    const [movedItem] = newOrder.splice(result.source.index, 1);
    newOrder.splice(result.destination.index, 0, movedItem);
    setAllTaskData(newOrder);

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
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="task-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {allTaskData.map((data, idx) => (
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
    // <div>
    //   <div className="">
    //     {allTaskData.map((data, idx) => (
    //       <TaskCard setSelectedTask={setSelectedTask} key={idx} data={data} />
    //     ))}
    //   </div>
    //   <TaskUpdateModal
    //     selectedTask={selectedTask}
    //     setSelectedTask={setSelectedTask}
    //   />
    // </div>
  );
};

export default TaskCardContainerAllTask;
