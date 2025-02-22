import { useContext, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import TaskCard from "../TaskCard/TaskCard";
import { AuthContext } from "../../Authentication/AuthContext/AuthContextProvider";
import useSocket from "../../hooks/useSocket";
import TaskUpdateModal from "../TaskUpdateModal/TaskUpdateModal";
import { useLocation } from "react-router-dom";

const TaskCardContainer = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedTask, setSelectedTask] = useState(null);
  const [todoData, setTodoData] = useState([]);
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const location = useLocation();
  const path = location.pathname;

  // fetch data
  const fetchTaskData = async () => {
    const res = await axiosSecure.get(`/todo-tasks?query=${email}`);
    if (res?.data) {
      const sortedData = res.data.sort((a, b) => a.order - b.order);
      setTodoData(sortedData);
    }
  };

  // effect handle
  useEffect(() => {
    fetchTaskData();
  }, [email]);

  // socket
  useSocket("TaskAdded", (data) => {
    if (data.task_category === "not started" && data.email === email) {
      setTodoData((prev) => [data, ...prev]);
    }
  });

  // socket task deleted
  useSocket("TaskDeleted", (id) => {
    setTodoData((prev) => prev.filter((data) => data._id !== id));
  });

  // task update
  useSocket("TaskUpdate", (updatedData) => {
    if (updatedData.email === email) {
      if (updatedData.task_category !== "not started") {
        setTodoData((prev) =>
          prev.filter((task) => task._id !== updatedData._id)
        );
      } else {
        setTodoData((prev) =>
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

  // Handle drag end event
  const handleDragEnd = async (result) => {
    // console.log(result);
    if (!result.destination) return;

    const newOrder = [...todoData];
    const [movedItem] = newOrder.splice(result.source.index, 1);
    newOrder.splice(result.destination.index, 0, movedItem);
    setTodoData(newOrder);

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

  // socket task completed
  useSocket("TaskCompleted", (data) => {
    if (data.task_category === "completed") {
      setTodoData((prev) => prev.filter((tasks) => tasks._id !== data.id));
    }
  });

  return (
    <div
      className={`overflow-y-scroll no-scrollbar ${
        path == "/" ? "h-[65vh]" : " mt-0 h-[75vh] "
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
              {todoData.map((data, idx) => (
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

export default TaskCardContainer;
