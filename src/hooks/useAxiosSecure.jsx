import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://get-it-done-server.onrender.com",
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
