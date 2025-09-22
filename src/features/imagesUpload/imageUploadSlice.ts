import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { uploadMultipleImages } from './imageUploadService';
import { UploadMultipleImagesPayload, UploadMultipleImagesResponse } from '@/utils/api-types/images';

export const uploadImages = createAsyncThunk<
  string[],
  UploadMultipleImagesPayload,
  { rejectValue: string }
>(
  'images/uploadImages',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await uploadMultipleImages(payload);
      if (response.success) {
        return response.data.images;
      }
      return rejectWithValue(response.message || 'Failed to upload images');
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to upload images');
    }
  }
);

type ImagesUploadState = {
  loading: boolean;
  error: string | null;
  uploadedUrls: string[];
};

const initialState: ImagesUploadState = {
  loading: false,
  error: null,
  uploadedUrls: [],
};

const imageUploadSlice = createSlice({
  name: 'imagesUpload',
  initialState,
  reducers: {
    resetImageUploadState: (state) => {
      state.loading = false;
      state.error = null;
      state.uploadedUrls = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadImages.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.uploadedUrls = [];
      })
      .addCase(uploadImages.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.uploadedUrls = action.payload || [];
      })
      .addCase(uploadImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.uploadedUrls = [];
      });
  },
});

export const { resetImageUploadState } = imageUploadSlice.actions;
export default imageUploadSlice.reducer;
