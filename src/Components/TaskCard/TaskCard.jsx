/* eslint-disable react/prop-types */
import { MdDeleteForever } from "react-icons/md";
import { RiEditBoxFill } from "react-icons/ri";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiTask } from "react-icons/bi";
import { FcHighPriority } from "react-icons/fc";
import { FcLowPriority } from "react-icons/fc";
import { FcMediumPriority } from "react-icons/fc";
import { useLocation } from "react-router-dom";

const TaskCard = ({ data, setSelectedTask }) => {
  const axiosSecure = useAxiosSecure();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [completedLoading, setCompletedLoading] = useState(false);
  // const location = useLocation();
  // const path = location.pathname

  // Date formatting
  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );

    const timeOptions = { hour: "numeric", minute: "2-digit", hour12: true };
    const formattedTime = new Intl.DateTimeFormat("en-US", timeOptions).format(
      date
    );

    return { date: formattedDate, time: formattedTime };
  };

  const {
    _id,
    task_title,
    task_description,
    task_category,
    task_priority,
    createdAt,
    completedOn,
  } = data;

  // Handle delete task
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setDeleteLoading(true);
        const res = await axiosSecure.delete(`/task/${id}`);
        if (res?.data.deletedCount > 0) {
          setDeleteLoading(false);
          toast.success("Task has been deleted!");
        }
      }
    });
  };

  // Handle update task
  const handleUpdate = (id, task) => {
    setSelectedTask(task);
  };

  // handle completed
  const handleCompleted = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to complete the task.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setCompletedLoading(true);

        const updatedCategory = {
          task_category: "completed",
          completedOn: new Date(),
          task_priority: "",
        };

        const res = await axiosSecure.patch(
          `/task-completed/${id}`,
          updatedCategory
        );
        if (res?.data.updated) {
          setCompletedLoading(false);
          toast.success("Task Completed!");
        }
      }
    });
  };

  return (
    <div className="border border-[#E5E7EB] p-4 lg:p-2 2xl:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
      <div className="flex flex-col space-y-4">
        {/* Task Title and Actions */}
        <div className="flex justify-between items-start">
          <h1 className="font-semibold text-xl text-gray-800">{task_title}</h1>
          <div className="flex ">
            {/* Edit Button */}
            {completedOn ? (
              ""
            ) : (
              <button
                title="Edit Task"
                onClick={() => handleUpdate(_id, data)}
                className="p-2 rounded-full hover:bg-cyan-100 transition-colors duration-200 cursor-pointer"
              >
                <RiEditBoxFill className="text-gray-500 w-5 h-5" />
              </button>
            )}

            {/* Delete Button */}
            <button
              title="Delete Task"
              onClick={() => handleDelete(_id)}
              className="p-2 rounded-full hover:bg-red-100 transition-colors duration-200 cursor-pointer"
              disabled={deleteLoading}
            >
              {deleteLoading ? (
                <span className="loading loading-spinner loading-sm text-gray-500" />
              ) : (
                <MdDeleteForever className="text-gray-500 w-5 h-5" />
              )}
            </button>

            {/* Mark as completed*/}
            {completedOn ? (
              ""
            ) : (
              <button
                title="Mark as complete"
                onClick={() => handleCompleted(_id)}
                className="p-2 rounded-full hover:bg-green-100 transition-colors duration-200 cursor-pointer"
                disabled={completedLoading}
              >
                {completedLoading ? (
                  <span className="loading loading-spinner loading-sm text-gray-500" />
                ) : (
                  <BiTask className="text-gray-500 w-5 h-5" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Task Description */}
        <p className="text-sm text-gray-600 line-clamp-4">
          {task_description}
        </p>

        {/* Task Metadata */}
        <div className="flex flex-wrap gap-2 text-xs text-gray-500">
          {/* priority */}
          {completedOn ? (
            ""
          ) : (
            <span
              className={`px-2 py-1 rounded-full montserrat text-black flex items-center gap-1 
                ${task_priority === "extreme" && "bg-[#F44336]/30"}
                ${task_priority === "moderate" && "bg-[#FFC107]/30"}
                ${task_priority === "low" && "bg-[#4CAF50]/30"}
                `}
            >
              Priority:{" "}
              <span className="font-semibold uppercase">{task_priority}</span>
              <span>
                <span>
                  {task_priority === "extreme" && <FcHighPriority size={15} />}
                </span>
                <span>
                  {task_priority === "moderate" && (
                    <FcMediumPriority size={15} />
                  )}
                </span>
                <span>
                  {task_priority === "low" && <FcLowPriority size={15} />}
                </span>
              </span>
            </span>
          )}

          {/* category */}
          <span className="px-2 py-1 bg-gray-100 rounded-full montserrat">
            Status:{" "}
            <span
              className={`uppercase font-semibold 
              ${task_category === "in progress" && "text-green-500"}
              ${task_category === "not started" && "text-red-400"}
              ${task_category === "completed" && "text-blue-500"}
              `}
            >
              {task_category}
            </span>
          </span>

          {/* time and date */}
          <span className="px-2 py-1 bg-blue-50 rounded-full montserrat">
            {completedOn ? (
              <span>
                Completed:{" "}
                <span className="font-bold">
                  {formatDate(completedOn).date} {" | "}
                  {formatDate(completedOn).time}
                </span>
              </span>
            ) : (
              <span>
                Created:{" "}
                <span className="font-bold">
                  {formatDate(createdAt).date} {" | "}
                  {formatDate(createdAt).time}
                </span>
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
