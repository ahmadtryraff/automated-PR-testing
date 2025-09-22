import axios from 'axios';

import {
  createdUserResponse,
  LoginParams,
  loginUserResponse,
  myProfileResponse,
  RegisterParams,
} from '../../../utils/api-types/auth';
import { axiosGet, axiosPost, axiosPatch } from '../../api/axios';
import { getToken, setToken } from '../../utils/auth';

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://api-gateway.tryraff.dev';
//https://0ce5-103-83-89-72.ngrok-free.app
// const BASE_URL = 'https://0ce5-103-83-89-72.ngrok-free.app';
const AUTH_PATH = `${BASE_URL}/api/v1/auth`;
const USERS_PATH = `${BASE_URL}/api/v1/users`;

export const login = async (
  payload: LoginParams,
): Promise<loginUserResponse> => {
  const response = await axiosPost<loginUserResponse, LoginParams>({
    path: `${AUTH_PATH}/login`,
    payload,
  });
  if (response?.status === 'success') {
    setToken(response.data.accessToken, response.data.access_level_type);
  }
  return response;
};

export const register = async (
  payload: RegisterParams,
): Promise<createdUserResponse> => {
  const response = await axiosPost({ path: `${AUTH_PATH}/register`, payload });
  if (response.status === 'success' && response.data.accessToken) {
    const accessLevelType = response.data.user?.access_level_type;
    setToken(response.data.accessToken, accessLevelType);
  }
  return response;
};

export const googleAuthApi = async (
  credential: string,
): Promise<loginUserResponse> => {
  const response = await fetch(`${AUTH_PATH}/google/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ credential }),
  });
  const data = await response.json();
  if (data?.status === 'success') {
    setToken(data.data.accessToken);
  }
  return data;
};

export const googleRegisterAuthApi = async (
  payload: any,
): Promise<loginUserResponse> => {
  const response = await fetch(`${AUTH_PATH}/register/google/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      credential: payload.credential,
      roleType: payload.roleType,
    }),
  });
  const data = await response.json();
  if (data?.status === 'success') {
    setToken(data.data.accessToken);
  }
  return data;
};

export const getProfile = async (): Promise<myProfileResponse> => {
  const response = await axiosGet({ path: `${AUTH_PATH}` });
  return response;
};

export const forgetPassword = async (email: string) => {
  const response = await axiosPost({
    path: `${AUTH_PATH}/forgot-password`,
    payload: { email },
  });
  return response;
};

export const resetPasswordWithToken = async (
  newPassword: string,
  token: string,
) => {
  const response = await fetch(`${AUTH_PATH}/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      password: newPassword,
    }),
  });
  const data = await response.json();
  return data;
};

export const changePassword = async (payload: {
  current_password: string;
  new_password: string;
  confirm_password: string;
}) => {
  const response = await axiosPost({
    path: `${AUTH_PATH}/change-password`,
    payload,
  });
  return response;
};

export const updateUserProfile = async (payload: {
  first_name: string;
  last_name: string;
  phone: string;
}) => {
  const response = await axiosPatch({
    path: USERS_PATH,
    payload,
  });
  return response;
};
