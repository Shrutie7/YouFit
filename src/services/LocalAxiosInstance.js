import axios from "axios";

const baseURL = process.env.REACT_APP_LOCAL_AXIOS_URL;

if (!baseURL) {
  throw new Error("REACT_APP_LOCAL_AXIOS_URL is not defined in the environment variables.");
}

const axiosInstance = axios.create({
  baseURL: "http://" + baseURL + "/",
  headers: { "Content-Type": "application/json" },
});

export default axiosInstance;