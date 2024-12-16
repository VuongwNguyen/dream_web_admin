import axios from "axios";
import Cookies from "js-cookie";

const AxiosInstance = (contentType = "application/json") => {
    const axiosInstance = axios.create({
        baseURL: "https://dreams-server-bmd-4sx0.onrender.com/api",
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
