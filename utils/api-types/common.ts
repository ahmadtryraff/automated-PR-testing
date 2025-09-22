export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  status?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
