/* eslint-disable react/prop-types */
import { MdDeleteForever } from "react-icons/md";
import { RiEditBoxFill } from "react-icons/ri";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiTask } from "react-icons/bi";

const TaskCard = ({ data, setSelectedTask }) => {
  const axiosSecure = useAxiosSecure();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [completedLoading, setCompletedLoading] = useState(false);

  const {
    _id,
    task_title,
    task_description,
    task_category,
    task_priority,
    createdAt,
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
    console.log(id);
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
    <div className="border border-[#E5E7EB] p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
      <div className="flex flex-col space-y-4">
        {/* Task Title and Actions */}
        <div className="flex justify-between items-start">
          <h1 className="font-semibold text-xl text-gray-800">{task_title}</h1>
          <div className="flex space-x-2">
            {/* Edit Button */}
            <button
              onClick={() => handleUpdate(_id, data)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
            >
              <RiEditBoxFill className="text-gray-500 w-5 h-5" />
            </button>

            {/* Delete Button */}
            <button
              onClick={() => handleDelete(_id)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
              disabled={deleteLoading}
            >
              {deleteLoading ? (
                <span className="loading loading-spinner loading-sm text-gray-500" />
              ) : (
                <MdDeleteForever className="text-gray-500 w-5 h-5" />
              )}
            </button>
            {/* Mark as completed*/}
            <button
              onClick={() => handleCompleted(_id)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
              disabled={completedLoading}
            >
              {completedLoading ? (
                <span className="loading loading-spinner loading-sm text-gray-500" />
              ) : (
                <BiTask className="text-gray-500 w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Task Description */}
        <p className="text-sm text-gray-600 line-clamp-3">{task_description}</p>

        {/* Task Metadata */}
        <div className="flex flex-wrap gap-2 text-xs text-gray-500">
          <span className="px-2 py-1 bg-gray-100 rounded-full">
            Priority: {task_priority}
          </span>
          <span className="px-2 py-1 bg-gray-100 rounded-full">
            Status: {task_category}
          </span>
          <span className="px-2 py-1 bg-gray-100 rounded-full">
            Created: {new Date(createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
