import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import TaskCard from "../TaskCard/TaskCard";
import { AuthContext } from "../../Authentication/AuthContext/AuthContextProvider";
import useSocket from "../../hooks/useSocket";
import TaskUpdateModal from "../TaskUpdateModal/TaskUpdateModal";

const TaskCardContainerInProgress = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedTask, setSelectedTask] = useState(null);
  const [inProgressData, setInProgressData] = useState([]);
  const { user } = useContext(AuthContext);
  const email = user?.email;

  console.log(inProgressData);

  // fetch data
  const fetchTaskData = async () => {
    const res = await axiosSecure.get(`/in-progress-tasks?query=${email}`);
    if (res?.data) {
      setInProgressData(res?.data);
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

  return (
    <div>
      <div className="">
        {inProgressData.map((data, idx) => (
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

export default TaskCardContainerInProgress;
