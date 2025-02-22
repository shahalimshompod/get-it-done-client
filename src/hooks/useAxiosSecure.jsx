import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://getitdone-xi.vercel.app",
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
