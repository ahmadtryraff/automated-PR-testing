// Next.js 14 Auth Types
export interface AuthFormData {
  email: string;
  password: string;
  keepLogin?: boolean;
}

export interface ServerActionResult {
  error?: string;
  success?: string;
  data?: any;
}

export interface AuthState {
  loading: boolean;
  error: string | null;
  success: boolean;
  user: AuthUser | null;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  status: 'success' | 'error';
  access_type?: 'brand' | 'vendor';
}

export interface LoginCredentials {
  email: string;
  password: string;
  keep_login: boolean;
}

export interface ResetPasswordData {
  email: string;
}

// Next.js 14 Server Action Types
export type LoginAction = (formData: FormData) => Promise<ServerActionResult>;
export type ResetPasswordAction = (formData: FormData) => Promise<ServerActionResult>;
export type LogoutAction = () => Promise<void>;

// Component Props Types
export interface AuthLayoutProps {
  children: React.ReactNode;
}

export interface LoginPageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export interface PasswordInputProps {
  id?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
}

// Form Validation Types
export interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: FormErrors;
}
