import {  axiosPost } from '../../api/axios';
import { UploadMultipleImagesPayload, UploadMultipleImagesResponse } from '@/utils/api-types/images';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://api-gateway.tryraff.dev';
const IMAGES_PATH = `${BASE_URL}/api/v1/users/images`;

export const uploadMultipleImages = async (payload: UploadMultipleImagesPayload): Promise<UploadMultipleImagesResponse> => {
  const formData = new FormData();
  formData.append('folderName', payload.folderName);
  payload.images.forEach((file) => {
    formData.append('images', file); // 'images' is the field name expected by your backend
  });

  const response = await axiosPost({
    path: `${IMAGES_PATH}/multiple?folder=${payload.folderName}`,
    payload: formData,
  });
  return response;
};
