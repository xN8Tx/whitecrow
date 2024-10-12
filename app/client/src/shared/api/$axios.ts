import type { InternalAxiosRequestConfig } from "axios";
import axios from "axios";
import { API_URL } from "../config";

const requestConfig = (config: InternalAxiosRequestConfig<unknown>) => {
  config.headers.Authorization = "Bearer " + localStorage.getItem("key");
  return config;
};

const $axios = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$axios.interceptors.request.use(requestConfig);

export { $axios };
