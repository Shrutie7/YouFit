import axiosInstance from "./LocalAxiosInstance";
import { useKeycloak } from "@react-keycloak/web";

const AppInterceptor = () => {
  const { keycloak, initialized } = useKeycloak();
  var token = "";

  axiosInstance.interceptors.request.use((config) => {
    token = keycloak.token;
    console.log(token);

    if (keycloak.authenticated) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
     if (error?.response?.status === 401) {
        return error
      }
      else{
        return error
      }
    }
  );
};

export default AppInterceptor;
