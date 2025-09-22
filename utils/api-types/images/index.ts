export interface UploadMultipleImagesPayload {
  images: File[];
  folderName: string;
}

export interface UploadMultipleImagesResponse {
  success: boolean;
  data: {
    images: string[];
  };
  message?: string;
}
