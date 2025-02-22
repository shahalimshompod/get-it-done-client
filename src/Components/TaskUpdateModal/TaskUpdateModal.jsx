/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const TaskUpdateModal = ({ selectedTask, setSelectedTask }) => {
  //   const {task_category, task_title, task_priority, task_description} = selectedTask;

  const axiosSecure = useAxiosSecure();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const task_title = data.title;
    const task_category = data.category;
    const task_priority = data.priority;
    const task_description = data.description;

    const updatedTaskData = {
      task_title,
      task_category,
      task_priority,
      task_description,
      completedOn: new Date(),
    };

    const updatedTask = {
      task_title,
      task_category,
      task_priority,
      task_description,
    };

    if (!selectedTask._id) {
      toast.error("Something went wrong! Please try again later.");
      return;
    }

    // send update req
    const res = await axiosSecure.put(
      `/task-update/${selectedTask?._id}`,
      task_category === "completed" ? updatedTaskData : updatedTask
    );
    console.log(res?.data);
    if (res?.data.modifiedCount > 0) {
      toast.success("Task updated successfully!");
      setSelectedTask(null);
      reset();
    } else {
      toast(`${res?.data.message}`, {
        duration: 4000,
        position: "top-center",

        // Styling
        style: {},
        className: "",

        // Custom Icon
        icon: "ℹ️",

        // Change colors of success/error/loading icon
        iconTheme: {
          primary: "#000",
          secondary: "#fff",
        },

        // Aria
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },

        // Additional Configuration
        removeDelay: 1000,
      });
      setSelectedTask(null);
      reset();
    }
  };

  useEffect(() => {
    if (selectedTask) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedTask]);

  //   close modal
  const handleCloseModal = () => {
    setSelectedTask(null);
    reset();
  };

  if (!selectedTask) return null;

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
          onClick={handleCloseModal}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 btn bg-transparent hover:bg-transparent border-none shadow-none"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* task title */}
          <div>
            <label className="block text-sm font-medium">Task Title</label>
            <input
              defaultValue={selectedTask.task_title}
              type="text"
              {...register("title", { required: "Task title is required" })}
              className="w-full p-2 border rounded-md"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* task description */}
          <div>
            <label className="block text-sm font-medium">
              Task Description
            </label>
            <textarea
              defaultValue={selectedTask.task_description}
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

          {/* task category */}
          <div>
            <label className="block text-sm font-medium">Task Category</label>
            <select
              defaultValue={selectedTask.task_category}
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
              defaultValue={selectedTask.task_priority}
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

export default TaskUpdateModal;
