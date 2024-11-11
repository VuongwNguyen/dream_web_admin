import axios from 'axios';
// import {store} from '../store';
// import {updateTokens} from '../store/slices';
// import {logoutRef} from '../components/LogoutDialog';

const BASEURL = 'http://192.168.1.10:8012/api';

let isRefreshing = false;
let queue = [];

const AxiosInstance = (contentType = 'application/json') => {
  const axiosInstance = axios.create({
    baseURL: BASEURL,
    timeout: 60000,
  });

  // const processQueue = (err, accessToken) => {
  //   queue.forEach(request => {
  //     if (err) {
  //       request.reject(err);
  //     } else {
  //       request.resolve(accessToken);
  //     }
  //   });

  //   queue = [];
  // };

  // const addRequest = originRequest => {
  //   return new Promise((resolve, reject) => {
  //     queue.push({resolve, reject});
  //   })
  //     .then(token => {
  //       originRequest.headers.authorization = `Bearer ${token}`;
  //       return axiosInstance(originRequest);
  //     })
  //     .catch(err => console.log('error: ', err));
  // };

  axiosInstance.interceptors.request.use(
    async config => {
      // let token;
      // if (store.getState().account.token.accessToken) {
      //   token = store.getState().account.token.accessToken;
      // }

      config.headers = {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjcxZTZiNWVlZjg3YWQzYjkzYWRiMDkxIiwiaWF0IjoxNzMxMDM1NTIxLCJleHAiOjE3MzM2Mjc1MjF9.wgdsDzmvqebrIVhHDTjAhWdYU9o1OcpBpumVKz0zruY`,
        Accept: 'application/json',
        'Content-Type': contentType,
        security: 'secure_code',
      };
      return config;
    },
    err => Promise.reject(err),
  );
  axiosInstance.interceptors.response.use(
    res => res.data,
    async err => {
      // if (!err?.response || !err?.response?.data)
      //   return await Promise.reject(err);

      // const refreshToken = store.getState().account.token.refreshToken;
      // const originRequest = err.config;

      // if (
      //   err.response?.status === 401 &&
      //   err.response?.data?.message !== 'jwt expired'
      // ) {
      //   // logout
      //   logoutRef.current?.showDialog();
      // }

      // if (
      //   err.response.status === 401 &&
      //   err.response.data.message === 'jwt expired'
      // ) {
      //   if (isRefreshing) {
      //     return addRequest(originRequest);
      //   }

      //   isRefreshing = true;

      //   try {
      //     const res = await axiosInstance.post('/account/renew-tokens', {
      //       refreshToken,
      //     });

      //     if (res) {
      //       const payload = {
      //         accessToken: res.data.token.accessToken,
      //         refreshToken: res.data.token.refreshToken,
      //       };

      //       store.dispatch(updateTokens(payload));
      //       processQueue(null, res.data.token.accessToken);
      //       originRequest.headers.authorization = `Bearer ${res.data.token.accessToken}`;
      //       return await axiosInstance(originRequest);
      //     }
      //   } catch (e) {
      //     processQueue(e, null);
      //     if (e.response.data.status === 401) {
      //       logoutRef.current?.showDialog();
      //       return;
      //     }
      //   } finally {
      //     isRefreshing = false;
      //   }
      // }

      return await Promise.reject(err);
    },
  );

  return axiosInstance;
};

export default AxiosInstance;
