import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import TaskCard from "../TaskCard/TaskCard";
import { AuthContext } from "../../Authentication/AuthContext/AuthContextProvider";
import useSocket from "../../hooks/useSocket";

const TaskCardContainerAllTask = () => {
  const axiosSecure = useAxiosSecure();
  const [allTaskData, setAllTaskData] = useState([]);
  const { user } = useContext(AuthContext);
  const email = user?.email;

  console.log(allTaskData);

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
  }, []);

  // socket
  useSocket("TaskAdded", (data) => {
    // fetchTaskData()
    if (data.email === email) {
      setAllTaskData((prev) => [data, ...prev]);
    }
  });

  return (
    <div>
      <div className="">
        {allTaskData.map((data, idx) => (
          <TaskCard key={idx} data={data} />
        ))}
      </div>
    </div>
  );
};

export default TaskCardContainerAllTask;
