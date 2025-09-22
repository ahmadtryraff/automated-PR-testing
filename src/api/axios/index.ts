import axios from "axios";
import { removeToken, getToken } from "../../utils/auth";

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
});
instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const isAuthError =
      (error?.response &&
        (error?.response?.data?.statusCode === 401 ||
          error?.response?.data?.statusCode === 403)) ||
      error?.response?.status === 401;

    // List of public endpoints that should NOT redirect
    const publicEndpoints = [
      '/reset-password',
      '/forgot-password',
      '/api/v1/auth/reset-password',
      '/api/v1/auth/forgot-password',

      // add others as needed
    ];

    const requestUrl = error?.config?.url || '';
    const isPublic = publicEndpoints.some((endpoint) => requestUrl.includes(endpoint));
    
    if (isAuthError && !isPublic) {
      removeToken();
      window.location.href = "/login";
      return Promise.resolve(null);
    }
    return Promise.reject(error);
  }
);

export const axiosGet = async <T = any, P = any> ({ path, params }: { path: string, params?: any }): Promise<T> => {
  const res = await instance.get(path, params ? { params } : undefined);
  return res.data;
};

export const axiosPost = async <T = any, P = any>({ path, payload }: { path: string; payload: P }): Promise<T> => {
  const res = await instance.post<T>(path, payload);
  return res.data;
};

export const axiosPatch = async ({ path, payload }: { path: string, payload: any }) => {
  const res = await instance.patch(path, payload);
  return res.data;
};

export const axiosPut = async ({ path, payload }: { path: string, payload: any }) => {
  const res = await instance.put(path, payload);
  return res.data;
};
export const axiosDelete = async ({ path }: { path: string }) => {
  const res = await instance.delete(path);
  return res.data;
};
