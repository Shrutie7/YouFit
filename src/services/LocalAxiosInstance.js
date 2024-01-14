import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://" + process.env.REACT_APP_LOCAL_AXIOS_URL+ "/",
  headers: {"Content-Type": "application/json"},
});

export default axiosInstance;

