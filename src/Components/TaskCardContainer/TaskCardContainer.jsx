import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import TaskCard from "../TaskCard/TaskCard";
import { AuthContext } from "../../Authentication/AuthContext/AuthContextProvider";
import useSocket from "../../hooks/useSocket";

const TaskCardContainer = () => {
  const axiosSecure = useAxiosSecure();
  const [todoData, setTodoData] = useState([]);
  const { user } = useContext(AuthContext);
  const email = user?.email;

  console.log(todoData);

  // useSocket("TaskDelete", (id) => {
  //   setTodoData;
  // });

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
  }, []);

  // socket
  useSocket("TaskAdded", (data) => {
    // fetchTaskData()
    if (data.task_category === "not started" && data.email === email) {
      setTodoData((prev) => [data, ...prev]);
    }
  });

  return (
    <div>
      <div className="">
        {todoData.map((data, idx) => (
          <TaskCard key={idx} data={data} />
        ))}
      </div>
    </div>
  );
};

export default TaskCardContainer;
