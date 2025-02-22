import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import TaskCard from "../TaskCard/TaskCard";
import { AuthContext } from "../../Authentication/AuthContext/AuthContextProvider";
import useSocket from "../../hooks/useSocket";
import TaskUpdateModal from "../TaskUpdateModal/TaskUpdateModal";

const TaskCardContainer = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedTask, setSelectedTask] = useState(null);
  const [todoData, setTodoData] = useState([]);
  const { user } = useContext(AuthContext);
  const email = user?.email;

  console.log(todoData);

  // fetch data
  const fetchTaskData = async () => {
    const res = await axiosSecure.get(`/todo-tasks?query=${email}`);
    if (res?.data) {
      setTodoData(res?.data);
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

  return (
    <div>
      <div className="">
        {todoData.map((data, idx) => (
          <TaskCard setSelectedTask={setSelectedTask} key={idx} data={data} />
        ))}
      </div>
      <TaskUpdateModal
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
      />
    </div>
  );
};

export default TaskCardContainer;
