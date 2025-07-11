import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Authentication/AuthContext/AuthContextProvider";

const axiosSecure = axios.create({
  // baseURL: "https://get-it-done-server.onrender.com",
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { userLogout } = useContext(AuthContext);

  // waiting func for token
  const waitForToken = () => {
    return new Promise((resolve) => {
      const checkToken = () => {
        const token = localStorage.getItem("access-token");
        if (token) {
          resolve(token);
        } else {
          setTimeout(checkToken, 100);
        }
      };
      checkToken();
    });
  };

  axiosSecure.interceptors.request.use(
    async function (config) {
      const token = await waitForToken();
      config.headers.authorization = `bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // interceptors status
  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error?.response?.status;

      // console.log("here is the status code -> ", status);

      if (status === 401 || status === 403) {
        await userLogout();
        navigate("/unauthorized-access");
      }

      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
