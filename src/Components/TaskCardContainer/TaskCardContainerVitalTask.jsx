import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import TaskCard from "../TaskCard/TaskCard";
import { AuthContext } from "../../Authentication/AuthContext/AuthContextProvider";
import useSocket from "../../hooks/useSocket";
import TaskUpdateModal from "../TaskUpdateModal/TaskUpdateModal";

const TaskCardContainerVitalTask = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedTask, setSelectedTask] = useState(null);
  const [vitalTaskData, setVitalTaskData] = useState([]);
  const { user } = useContext(AuthContext);
  const email = user?.email;

  // fetch data
  const fetchTaskData = async () => {
    const res = await axiosSecure.get(`/vital-tasks?query=${email}`);
    if (res?.data) {
      setVitalTaskData(res?.data);
    }
  };

  // effect handle
  useEffect(() => {
    fetchTaskData();
  }, []);

  //   SOCKET
  // socket task added
  useSocket("TaskAdded", (data) => {
    // fetchTaskData()
    if (data.email === email && data.task_priority === "extreme") {
      setVitalTaskData((prev) => [data, ...prev]);
    }
  });

  //   socket task deleted
  useSocket("TaskDeleted", (id) => {
    setVitalTaskData((prev) => prev.filter((data) => data._id !== id));
  });

  return (
    <div>
      <div className="">
        {vitalTaskData.map((data, idx) => (
          <TaskCard setSelectedTask={setSelectedTask} key={idx} data={data} />
        ))}
      </div>
      {/* update form */}
      <TaskUpdateModal
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
      />
    </div>
  );
};

export default TaskCardContainerVitalTask;
