import { async } from "@firebase/util";
import axios from "axios";
// import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // withCredentials: true,
});
const useAxiosSecqur = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
      //console.log("req stop", token);
      config.headers.authorization = `Berer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (err) => {
      const status = err.response.status;
      //console.log("stta erroe", error);
      if (status === 401 || status === 403) {
        await logout();
        navigate("/login");
      }
      return Promise.reject(err);
    }
  );

  return axiosSecure;
};

export default useAxiosSecqur;
