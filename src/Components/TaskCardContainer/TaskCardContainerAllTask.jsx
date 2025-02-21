import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import TaskCard from "../TaskCard/TaskCard";
import { AuthContext } from "../../Authentication/AuthContext/AuthContextProvider";
import useSocket from "../../hooks/useSocket";

const TaskCardContainerAllTask = () => {
  const axiosSecure = useAxiosSecure();
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
  }, []);

  // socket
  useSocket("TaskAdded", (data) => {
    // fetchTaskData()
    if (data.task_category === "completed" && data.email === email) {
      setCompletedTaskData((prev) => [data, ...prev]);
    }
  });

  return (
    <div>
      <div className="">
        {completedTaskData.map((data, idx) => (
          <TaskCard key={idx} data={data} />
        ))}
      </div>
    </div>
  );
};

export default TaskCardContainerAllTask;
