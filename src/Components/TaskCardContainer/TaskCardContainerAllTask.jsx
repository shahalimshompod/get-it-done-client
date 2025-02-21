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

  //   socket task deleted
  useSocket("TaskDeleted", (id) => {
    setAllTaskData((prev) => prev.filter((data) => data._id !== id));
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
