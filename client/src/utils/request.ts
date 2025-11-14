import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { getToken, removeToken } from "./auth";
import errorCode from "@/utils/errorCode";

const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  timeout: 5000,
});

service.interceptors.request.use(
  (config: any) => {
    const token = getToken();
    if (token && config.headers) {
      (config.headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
    }
    if (config.headers) {
      (config.headers as Record<string, string>)["Cache-Control"] = "no-cache";
      (config.headers as Record<string, string>)["Pragma"] = "no-cache";
      (config.headers as Record<string, string>)["Expires"] = "0";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (res: AxiosResponse<any>) => {
    const code = (res.data?.code ?? (res as any).code ?? 200) as number;
    const msg =
      (errorCode as Record<number, string>)[code] ||
      res.data?.msg ||
      (res as any).message ||
      (errorCode as Record<string, string>)["default"];

    if (code === 401) {
      removeToken();
      location.replace("/login");
      return Promise.reject("无效的会话，或者会话已过期，请重新登录。");
    } else if (code === 500) {
      return Promise.reject(msg);
    } else if (code !== 200) {
      return Promise.reject(msg);
    } else {
      return Promise.resolve(res.data);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default async function request<T = any>(config: AxiosRequestConfig): Promise<T> {
  const res = await service.request(config);
  return res as unknown as T;
}
