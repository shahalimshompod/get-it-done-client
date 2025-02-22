/* eslint-disable react/prop-types */
import { MdDeleteForever } from "react-icons/md";
import { RiEditBoxFill } from "react-icons/ri";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import toast from "react-hot-toast";

const TaskCard = ({ data, setSelectedTask }) => {
  const axiosSecure = useAxiosSecure();
  // loading state
  const [loading, setLoading] = useState(false);

  

  const {
    _id,
    task_title,
    task_description,
    task_category,
    task_priority,
    createdAt,
  } = data;

  // handle delete task
  const handleDelete = (id) => {
    console.log(id);
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
        setLoading(true);
        const res = await axiosSecure.delete(`/task/${id}`);

        console.log(res?.data);
        // after getting res
        if (res?.data.deletedCount > 0) {
          setLoading(false);
          toast.success("Task has been deleted!");
        }
      }
    });
  };

  // handle update task
  const handleUpdate = (id, task) => {
    setSelectedTask(task);
    console.log(task._id);
  };

  return (
    <div className="border border-[#A1A3AB] p-4 rounded-2xl">
      <div className="">
        <div className="text-red-500 bg-red-500 w-[21px] h-[20px] rounded-full absolute"></div>

        <div className="ml-8">
          <div className="flex justify-between">
            {/* title */}
            <h1 className="montserrat w-9/12 font-bold mb-3 text-lg">
              {task_title}
            </h1>

            {/* short description */}
            <div className="flex gap-3">
              <button
                onClick={() => handleUpdate(_id, data)}
                className="text-gray-500 btn btn-circle"
              >
                <RiEditBoxFill size={18} />
              </button>
              <button
                onClick={() => handleDelete(_id)}
                className="text-gray-500 btn btn-circle"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  <MdDeleteForever size={19} />
                )}
              </button>
            </div>
          </div>

          {/* short description */}
          <p className="montserrat line-clamp-3 text-sm">{task_description}</p>
        </div>

        <p className="text-[10px] md:text-xs mt-3 ml-8 montserrat">
          <span className="mr-2">
            Priority: <span>{task_priority} </span>
          </span>
          <span className="mr-2">
            Status: <span>{task_category} </span>
          </span>
          <span>
            created on: <span>{createdAt}</span>
          </span>
        </p>
      </div>
    </div>
  );
};

export default TaskCard;
