import axios from "axios";

const AxiosInstance = (contentType = "application/json") => {
    const axiosInstance = axios.create({
        baseURL: "http://192.168.100.234:8012/api",
    });

    axiosInstance.interceptors.request.use(
        async (config) => {
            const token =
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjcxZTZiNWJlZjg3YWQzYjkzYWRiMDc2IiwiaWF0IjoxNzMxMjM4MDQ2LCJleHAiOjE3MzM4MzAwNDZ9.AYYadtZXyecQHon3aBP1q3_JHgnJh3LyUGkWsDdJOks";
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
