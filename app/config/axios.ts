import axiosInstance, { AxiosRequestConfig, AxiosResponse } from 'axios';
import ENDPOINT from './endpoint';
import local from '../utils/localStorage';
import { showToast } from '../utils/toast';
import { clearClientCookies, getClientCookie } from '../utils/cookie.client';

const axios = axiosInstance.create({
  baseURL: ENDPOINT.BASE_URL,
  timeout: 60000,
  headers: { 'Access-Control-Allow-Headers': 'Content-Type' },
});

axios.interceptors.request.use(
  async (config) => {
    const token = getClientCookie('accessToken');
    const accessToken = token ? `Bearer ${token}` : null;
    if (accessToken) {
      config.headers.set('Authorization', accessToken); // auto attach token
    }
    return config;
  },

  function (error) {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  async (res) => {
    if (res?.data?.status == 401 && !res?.data?.auth) {
      //refresh token...
      const refreshToken = local.get('refreshToken') || null;
      const result = await axios.post('/getToken', { refreshToken });
      if (result?.status === 200) {
        local.add('accessToken', JSON.stringify(result.data.accessToken));
        return res;
      }
    }
    return res;
  },
  (err) => {
    console.log('err', err);
    showToast(err?.response?.data.message, 'error');
    // if (!err?.response?.data?.refreshToken) {
    //   local.clear();
    //   window.confirm('Your session is expired...');
    //   window.location.replace('./login');
    // }
    // clearClientCookies()
    return err;
  },
);

export { axios };

export default async function customInstance<T = unknown>(config: AxiosRequestConfig): Promise<T> {
  const res: AxiosResponse<T> = await axios.request<T>(config);
  return res.data; // 👈 Orval nhận luôn `data` với type chuẩn
}
