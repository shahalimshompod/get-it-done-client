/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { AuthContext } from "../../Authentication/AuthContext/AuthContextProvider";

const TaskModal = ({ isOpen, onClose }) => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(false);

  const {
    reset,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [titleCharCount, setTitleCharCount] = useState(0);
  const [descriptionCharCount, setDescriptionCharCount] = useState(0);

  const taskTitle = watch("title", "");
  const taskDescription = watch("description", "");

  // Character count for task title
  useEffect(() => {
    setTitleCharCount(taskTitle.length);
  }, [taskTitle]);

  // Character count for task description
  useEffect(() => {
    setDescriptionCharCount(taskDescription.length);
  }, [taskDescription]);

  const onSubmit = async (data) => {
    setLoading(true);
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
      reset();
      setLoading(false);
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
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50 ">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="backdrop-blur-lg p-6 rounded-lg shadow-2xl w-full max-w-md relative mx-2 lg:mx-0"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 btn btn-circle bg-red-100 border-none"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* title */}
          <div>
            <label className="block text-sm font-medium montserrat mb-1">
              Task Title
            </label>
            <input
              placeholder="Task title"
              type="text"
              {...register("title", {
                required: "Task title is required",
                maxLength: {
                  value: 50,
                  message: "Task title cannot exceed 50 characters",
                },
              })}
              className="w-full p-2 border rounded-md montserrat"
            />
            <div className="flex flex-row-reverse items-center justify-between">
              <div className="text-sm text-gray-500 text-right">
                {titleCharCount}/50
              </div>
              <div>
                {errors.title && (
                  <p className="text-red-500 text-sm montserrat">
                    {errors.title.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* description */}
          <div>
            <label className="block text-sm font-medium montserrat mb-1">
              Task Description
            </label>
            <textarea
              placeholder="Task Description"
              {...register("description", {
                required: "Task description is required",
                maxLength: {
                  value: 200,
                  message: "Task description cannot exceed 200 characters",
                },
              })}
              className="w-full p-2 border rounded-md montserrat"
            ></textarea>

            <div className="flex flex-row-reverse items-center justify-between">
              <div className="text-sm text-gray-500 text-right">
                {descriptionCharCount}/200
              </div>
              <div>
                {errors.description && (
                  <p className="text-red-500 text-sm montserrat">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* category */}
          <div>
            <label className="block text-sm font-medium montserrat mb-1">
              Task Category
            </label>
            <select
              {...register("category", {
                required: "Task category is required",
              })}
              className="w-full p-2 border rounded-md montserrat"
            >
              <option value="">Select Category</option>
              <option value="not started">Not Started</option>
              <option value="in progress">In Progress</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm montserrat">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* priority */}
          <div>
            <label className="block text-sm font-medium montserrat mb-1">
              Task Priority
            </label>
            <select
              {...register("priority", {
                required: "Task priority is required",
              })}
              className="w-full p-2 border rounded-md montserrat"
            >
              <option value="">Select Priority</option>
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="extreme">Extreme</option>
            </select>
            {errors.priority && (
              <p className="text-red-500 text-sm montserrat">
                {errors.priority.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#FF6767] text-white p-2 rounded-md btn montserrat font-medium"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Add Task"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default TaskModal;
