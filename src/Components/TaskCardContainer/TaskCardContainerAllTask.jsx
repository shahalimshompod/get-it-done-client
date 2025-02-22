import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import TaskCard from "../TaskCard/TaskCard";
import { AuthContext } from "../../Authentication/AuthContext/AuthContextProvider";
import useSocket from "../../hooks/useSocket";
import TaskUpdateModal from "../../Components/TaskUpdateModal/TaskUpdateModal";

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
      setAllTaskData(res?.data);
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
  useSocket("TaskUpdate", () => {
    fetchTaskData();
  });

  
  return (
    <div>
      <div className="">
        {allTaskData.map((data, idx) => (
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

export default TaskCardContainerAllTask;
