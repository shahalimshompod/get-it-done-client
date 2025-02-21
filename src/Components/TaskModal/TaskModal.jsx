/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useContext, useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { AuthContext } from "../../Authentication/AuthContext/AuthContextProvider";

const TaskModal = ({ isOpen, onClose }) => {
  const { user } = useContext(AuthContext);

  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const task_title = data.title;
    const task_description = data.description;
    const task_category = data.category;
    const task_priority = data.priority;
    const user_Email = user?.email;

    const dataToSend = {
      task_title,
      task_description,
      task_category,
      task_priority,
      email: user_Email,
    };

    const res = await axiosSecure.post("/add-tasks", dataToSend);
    if (res?.data.insertedId) {
      toast.success("Task Added Successfully");
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#FF6767]/30 bg-opacity-50 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 btn bg-transparent hover:bg-transparent border-none shadow-none"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Task Title</label>
            <input
              type="text"
              {...register("title", { required: "Task title is required" })}
              className="w-full p-2 border rounded-md"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">
              Task Description
            </label>
            <textarea
              {...register("description", {
                required: "Task description is required",
              })}
              className="w-full p-2 border rounded-md"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Task Category</label>
            <select
              {...register("category", {
                required: "Task category is required",
              })}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Category</option>
              <option value="not started">Not Started</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Task Priority</label>
            <select
              {...register("priority", {
                required: "Task priority is required",
              })}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Priority</option>
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="extreme">Extreme</option>
            </select>
            {errors.priority && (
              <p className="text-red-500 text-sm">{errors.priority.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md btn"
          >
            Add Task
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default TaskModal;
