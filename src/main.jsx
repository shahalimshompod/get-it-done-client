import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Layout/Root/Root";
import HomeRoute from "./Layout/Home/HomeRoute";
import Dashboard from "./Private/Dashboard/Dashboard";
import MyProfile from "./Private/MyProfile/MyProfile";
import VitalTask from "./Private/VitalTask/VitalTask";
import AllTask from "./Private/AllTask/AllTask";
import TaskCategory from "./Private/TaskCategory/TaskCategory";
import Todo from "./Private/Todo/Todo";
import CompletedTask from "./Private/CompletedTask/CompletedTask";
import InProgress from "./Private/InProgress/InProgress";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <HomeRoute />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
            loader: () => {
              document.title = "Dashboard | GetItDone";
            },
          },
          {
            path: "/my-profile",
            element: <MyProfile />,
            loader: () => {
              document.title = "My Profile | GetItDone";
            },
          },
          {
            path: "/tasks/vital-task",
            element: <VitalTask />,
            loader: () => {
              document.title = "My Profile | GetIt Done";
            },
          },
          {
            path: "/tasks/my-tasks",
            element: <AllTask />,
            loader: () => {
              document.title = "My Profile | GetItDone";
            },
          },
          {
            path: "/tasks/task-categories",
            element: <TaskCategory />,
            loader: () => {
              document.title = "My Profile | GetItDone";
            },
          },
          {
            path: "/tasks/to-do",
            element: <Todo />,
            loader: () => {
              document.title = "My Profile | GetItDone";
            },
          },
          {
            path: "/tasks/in-progress",
            element: <InProgress />,
            loader: () => {
              document.title = "My Profile | GetItDone";
            },
          },
          {
            path: "/tasks/completed",
            element: <CompletedTask />,
            loader: () => {
              document.title = "My Profile | GetItDone";
            },
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
