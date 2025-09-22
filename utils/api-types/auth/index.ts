import { ApiResponse } from '../common';


export interface LoginParams {
  email: string;
  password: string;
}

export interface RegisterParams {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone: string;
  access_level_type: 'brand' | 'vendor';
}
export interface LoginUserResponse {
  email: string;
  password: string;
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  access_level_type: string;
  google_auth_key: string | null;
  parent_user_id: string | null;
  is_verified: boolean;
  invite_token: string | null;
  invite_token_expires: string | null;
  invitation_status: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  sub_user_name: string | null;
  is_first_step_completed: boolean;
  is_second_step_completed: boolean;
  is_third_step_completed: boolean;
}

export type loginUserResponse = ApiResponse<{
  accessToken: string;
  access_level_type: string;
  data: {
    accessToken: string;
    access_level_type: string;
  };
}>;

export interface CreatedUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  access_level_type: string;
  google_auth_key: string | null;
  custom_role_id: string | null;
  parent_user_id: string | null;
  is_verified: boolean;
  invite_token: string | null;
  invite_token_expires: string | null;
  invitation_status: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
export type myProfileResponse = ApiResponse<User>;
export type createdUserResponse = ApiResponse<CreatedUser>;

export interface CreateTeamMemberPayload {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  custom_role_ids: string[];
}

export interface UserRole {
  role_name: string;
}

export interface TeamMember {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  is_status: boolean;
  user_roles: UserRole[];
}

export interface Role {
  id: string;
  name: string;
}

export type RolesResponse = ApiResponse<Role[]>;
export type CreateTeamMemberResponse = ApiResponse<CreatedUser>;
export type TeamMembersResponse = ApiResponse<TeamMember[]>;
