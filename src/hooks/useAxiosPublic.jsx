import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://get-it-done-server.onrender.com",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
