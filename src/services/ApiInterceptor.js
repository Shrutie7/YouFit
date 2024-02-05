import axiosInstance from "./LocalAxiosInstance";
import { useKeycloak } from "@react-keycloak/web";

const AppInterceptor = () => {
  const { keycloak, initialized } = useKeycloak();
  var token = "";

  axiosInstance.interceptors.request.use((config) => {
    token = keycloak.token;
    console.log(token);

    if (keycloak.authenticated && config.url === "users/getuser") {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return error;
    }
  );
};

export default AppInterceptor;
