import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Layout/Root/Root";
import HomeRoute from "./Layout/Home/HomeRoute";
import Dashboard from "./Private/Dashboard/Dashboard";
import VitalTask from "./Private/VitalTask/VitalTask";
import AllTask from "./Private/AllTask/AllTask";
import TaskCategory from "./Private/TaskCategory/TaskCategory";
import Todo from "./Private/Todo/Todo";
import InProgress from "./Private/InProgress/InProgress";
import AuthContextProvider from "./Authentication/AuthContext/AuthContextProvider";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import { Toaster } from "react-hot-toast";
import SecureRoute from "./Authentication/SecureRoute/SecureRoute";
import CompletedTask from "./Private/CompletedTask/CompletedTask";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import UnauthorizedPage from "./Pages/UnauthorizedPage/UnauthorizedPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <SecureRoute>
        <Root />
      </SecureRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <SecureRoute>
            <HomeRoute />
          </SecureRoute>
        ),
        children: [
          {
            path: "/",
            element: (
              <SecureRoute>
                <Dashboard />
              </SecureRoute>
            ),
            loader: () => {
              document.title = "Dashboard | GetItDone";
            },
          },
          {
            path: "/tasks/vital-task",
            element: (
              <SecureRoute>
                <VitalTask />
              </SecureRoute>
            ),
            loader: () => {
              document.title = "Vital Tasks | GetIt Done";
            },
          },
          {
            path: "/tasks/my-tasks",
            element: (
              <SecureRoute>
                <AllTask />
              </SecureRoute>
            ),
            loader: () => {
              document.title = "My Tasks | GetItDone";
            },
          },
          {
            path: "/tasks/to-do",
            element: (
              <SecureRoute>
                <Todo />
              </SecureRoute>
            ),
            loader: () => {
              document.title = "To Do | GetItDone";
            },
          },
          {
            path: "/tasks/in-progress",
            element: (
              <SecureRoute>
                <InProgress />
              </SecureRoute>
            ),
            loader: () => {
              document.title = "In Progress | GetItDone";
            },
          },
          {
            path: "/tasks/completed",
            element: (
              <SecureRoute>
                <CompletedTask />
              </SecureRoute>
            ),
            loader: () => {
              document.title = "Completed Task | GetItDone";
            },
          },
        ],
      },
    ],
  },
  {
    path: "/unauthorized-access",
    element: <UnauthorizedPage />,
    loader: () => {
      document.title = "Unauthorized";
      return;
    },
  },
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      document.title = "Login | GetItDone";
    },
  },
  {
    path: "/register",
    element: <Register />,
    loader: () => {
      document.title = "Register | GetItDone";
    },
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <Toaster />
      <RouterProvider router={router} />
    </AuthContextProvider>
  </StrictMode>
);
