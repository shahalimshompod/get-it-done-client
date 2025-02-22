import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import TaskCard from "../TaskCard/TaskCard";
import { AuthContext } from "../../Authentication/AuthContext/AuthContextProvider";
import useSocket from "../../hooks/useSocket";
import TaskUpdateModal from "../TaskUpdateModal/TaskUpdateModal";

const TaskCardContainerCompleted = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedTask, setSelectedTask] = useState(null);
  const [completedTaskData, setCompletedTaskData] = useState([]);
  const { user } = useContext(AuthContext);
  const email = user?.email;

  console.log(completedTaskData);

  // fetch data
  const fetchTaskData = async () => {
    const res = await axiosSecure.get(`/completed-tasks?query=${email}`);
    if (res?.data) {
      setCompletedTaskData(res?.data);
    }
  };

  // effect handle
  useEffect(() => {
    fetchTaskData();
  }, [completedTaskData]);

  // socket
  useSocket("TaskAdded", (data) => {
    // fetchTaskData()
    if (data.task_category === "completed" && data.email === email) {
      setCompletedTaskData((prev) => [data, ...prev]);
    }
  });

  //   socket task deleted
  useSocket("TaskDeleted", (id) => {
    setCompletedTaskData((prev) => prev.filter((data) => data._id !== id));
  });

  // task update
  useSocket("TaskUpdate", (updatedData) => {
    if (updatedData.email === email) {
      if (updatedData.task_category !== "completed") {
        // If task is no longer "not started", remove it from the list
        setCompletedTaskData((prev) =>
          prev.filter((task) => task._id !== updatedData._id)
        );
      } else {
        // If task is still "not started", update it in the list
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

  return (
    <div>
      <div className="">
        {completedTaskData.map((data, idx) => (
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

export default TaskCardContainerCompleted;
