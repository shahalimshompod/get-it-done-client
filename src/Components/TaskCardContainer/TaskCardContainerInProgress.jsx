import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import TaskCard from "../TaskCard/TaskCard";
import { AuthContext } from "../../Authentication/AuthContext/AuthContextProvider";
import useSocket from "../../hooks/useSocket";

const TaskCardContainerInProgress = () => {
  const axiosSecure = useAxiosSecure();
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

  return (
    <div>
      <div className="">
        {inProgressData.map((data, idx) => (
          <TaskCard key={idx} data={data} />
        ))}
      </div>
    </div>
  );
};

export default TaskCardContainerInProgress;
