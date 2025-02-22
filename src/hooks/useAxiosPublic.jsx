import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://getitdone-xi.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
