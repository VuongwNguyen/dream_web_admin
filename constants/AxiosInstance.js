import axios from "axios";
import Cookies from "js-cookie";

const AxiosInstance = (contentType = "application/json") => {
    const axiosInstance = axios.create({
        baseURL: "https://1699-2402-800-637d-9a2f-ac7e-a196-ff5-349a.ngrok-free.app/api",
    });
    const token = Cookies.get("token");
    axiosInstance.interceptors.request.use(
        async (config) => {
            config.headers = {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": contentType,
            };
            return config;
        },
        (err) => Promise.reject(err)
    );

    axiosInstance.interceptors.response.use(
        (res) => res.data,
        (err) => Promise.reject(err)
    );
    return axiosInstance;
};

export default AxiosInstance;
