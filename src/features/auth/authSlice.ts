import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { removeToken, setToken } from '../../utils/auth';
import * as authService from './authService';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (
    payload: { email: string; password: string; keep_login: boolean },
    { rejectWithValue },
  ) => {
    try {
      const data = await authService.login(payload);
      if (data.status !== 'success') {
        return rejectWithValue(data.message || 'Something went wrong');
      }
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (payload: any, { rejectWithValue }) => {
    try {
      const data = await authService.register(payload);
      if (data.status !== 'success') {
        return rejectWithValue(data.message || 'Something went wrong');
      }
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const googleAuth = createAsyncThunk(
  'auth/googleAuth',
  async (credential: string, { rejectWithValue }) => {
    try {
      const data = await authService.googleAuthApi(credential);
      if (data.status !== 'success') {
        return rejectWithValue(data.message || 'Something went wrong');
      }
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const registerGoogleAuth = createAsyncThunk(
  'auth/registerGoogleAuth',
  async (payload: any, { rejectWithValue }) => {
    try {
      const data = await authService.googleRegisterAuthApi(payload);
      if (data.status !== 'success') {
        return rejectWithValue(data.message || 'Something went wrong');
      }
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const forgetPassword = createAsyncThunk(
  'auth/forgetPassword',
  async (email: string, { rejectWithValue }) => {
    try {
      const data = await authService.forgetPassword(email);
      if (data.status !== 'success') {
        return rejectWithValue(data.message || 'Something went wrong');
      }
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const getMyProfile = createAsyncThunk(
  'auth/getMyProfile',
  async (_, { rejectWithValue }) => {
    try {
      const data = await authService.getProfile();
      if (data.status !== 'success') {
        return rejectWithValue(data.message || 'Something went wrong');
      }
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const resetPasswordWithToken = createAsyncThunk(
  'auth/resetPasswordWithToken',
  async (
    { newPassword, token }: { newPassword: string; token: string },
    { rejectWithValue },
  ) => {
    try {
      const data = await authService.resetPasswordWithToken(newPassword, token);
      if (data.status !== 'success') {
        return rejectWithValue(data.message || 'Something went wrong');
      }
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (
    payload: {
      current_password: string;
      new_password: string;
      confirm_password: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const data = await authService.changePassword(payload);
      if (data.status !== 'success') {
        return rejectWithValue(data.message || 'Something went wrong');
      }
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (
    payload: { first_name: string; last_name: string; phone: string },
    { rejectWithValue },
  ) => {
    try {
      const data = await authService.updateUserProfile(payload);
      if (data.status !== 'success') {
        return rejectWithValue(data.message || 'Something went wrong');
      }
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// Initial State
interface AuthState {
  loading: boolean;
  user: any;
  error: string | null;
  success: boolean;
  message: string | null;
}

const initialState: AuthState = {
  loading: false,
  user: null,
  error: null,
  success: false,
  message: null,
};

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.success = false;
      removeToken();
    },
    resetAuthState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.message = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.success = action.payload.status === 'success';
      state.error =
        action.payload.status !== 'success'
          ? action.payload.message || 'Unknown error'
          : null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string | null;
      state.success = false;
    });

    // Register
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.success = action.payload.status === 'success';
      state.error =
        action.payload.status !== 'success'
          ? action.payload.message || 'Unknown error'
          : null;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string | null;
      state.success = false;
    });

    builder.addCase(googleAuth.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(googleAuth.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.success = action.payload.status === 'success';
      state.error =
        action.payload.status !== 'success'
          ? action.payload.message || 'Unknown error'
          : null;
    });
    builder.addCase(googleAuth.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string | null;
      state.success = false;
    });

    builder.addCase(registerGoogleAuth.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(registerGoogleAuth.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.success = action.payload.status === 'success';
      state.error =
        action.payload.status !== 'success'
          ? action.payload.message || 'Unknown error'
          : null;
    });
    builder.addCase(registerGoogleAuth.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string | null;
      state.success = false;
    });

    // Get My Profile
    builder.addCase(getMyProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(getMyProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.success = true;
      state.error = null;
    });
    builder.addCase(getMyProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string | null;
      state.success = false;
    });

    builder.addCase(forgetPassword.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    });
    builder.addCase(forgetPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.data?.message || 'Email has been sent.';
      state.error = null;
      state.success = true;
    });
    builder.addCase(forgetPassword.rejected, (state, action) => {
      state.loading = false;
      state.message = null;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      } else if (
        action.payload &&
        typeof action.payload === 'object' &&
        'message' in action.payload
      ) {
        state.error = (action.payload as any).message;
      } else {
        state.error = 'Failed to reset password';
      }
      state.success = false;
    });
    builder.addCase(resetPasswordWithToken.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    });
    builder.addCase(resetPasswordWithToken.fulfilled, (state, action) => {
      state.loading = false;
      state.message =
        action.payload.data?.message || 'Password has been reset.';
      state.error = null;
      state.success = true;
    });
    builder.addCase(resetPasswordWithToken.rejected, (state, action) => {
      state.loading = false;
      state.message = null;
      state.error = (action.payload as string) || 'Failed to reset password';
      state.success = false;
    });

    // Change Password
    builder.addCase(changePassword.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.loading = false;
      state.message =
        action.payload.data?.message || 'Password changed successfully.';
      state.error = null;
      state.success = true;
    });
    builder.addCase(changePassword.rejected, (state, action) => {
      state.loading = false;
      state.message = null;
      state.error =
        (action.payload && (action.payload as any).message) ||
        (typeof action.error?.message === 'string'
          ? action.error.message
          : 'Failed to change password');
      state.success = false;
    });

    // Update User Profile
    builder.addCase(updateUserProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.message =
        action.payload.data?.message || 'Profile updated successfully.';
      state.error = null;
      state.success = true;
      // Update the user data in state if the response contains updated user info
      if (action.payload.data) {
        state.user = action.payload;
      }
    });
    builder.addCase(updateUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.message = null;
      state.error =
        (action.payload && (action.payload as any).message) ||
        (typeof action.error?.message === 'string'
          ? action.error.message
          : 'Failed to update profile');
      state.success = false;
    });
  },
});

export const { logout, resetAuthState, setError } = authSlice.actions;
export default authSlice.reducer;
