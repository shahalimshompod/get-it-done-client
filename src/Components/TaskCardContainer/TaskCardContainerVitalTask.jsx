import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import TaskCard from "../TaskCard/TaskCard";
import { AuthContext } from "../../Authentication/AuthContext/AuthContextProvider";
import useSocket from "../../hooks/useSocket";

const TaskCardContainerVitalTask = () => {
  const axiosSecure = useAxiosSecure();
  const [vitalTaskData, setVitalTaskData] = useState([]);
  const { user } = useContext(AuthContext);
  const email = user?.email;

  console.log(vitalTaskData);

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

  // socket
  useSocket("TaskAdded", (data) => {
    // fetchTaskData()
    if (data.email === email && data.task_priority === "extreme") {
      setVitalTaskData((prev) => [data, ...prev]);
    }
  });

  return (
    <div>
      <div className="">
        {vitalTaskData.map((data, idx) => (
          <TaskCard key={idx} data={data} />
        ))}
      </div>
    </div>
  );
};

export default TaskCardContainerVitalTask;
