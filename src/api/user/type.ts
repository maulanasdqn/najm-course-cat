import { TResponseData, TResponsePaginate } from "@/commons/types/response";
import { TRoleItem } from "../role/type";
import {
  CreateUserFormData,
  UpdateUserFormData,
} from "@/app/(admin)/users/_schemas/user-form.schema";

export type TUserItem = {
  avatar: string;
  birthdate: string;
  created_at: string;
  email: string;
  fullname: string;
  id: string;
  phone_number: string;
  role: TRoleItem;
  updated_at: string;
  student_type: string;
  referral_code?: string;
  referred_by?: string;
  is_active?: boolean;
  is_profile_completed: boolean;
};

export type TUserCreateRequest = CreateUserFormData;
export type TUserUpdateRequest = UpdateUserFormData;
export type TUserMeUpdateRequest = {
  avatar: string;
  birthdate: string;
  email: string;
  fullname: string;
  gender: string;
  identity_number: string;
  phone_number: string;
  religion: string;
  address?: string;
  experience?: string;
  school?: string;
  role_id: string;
  student_type: string;
};

export type TGetUsersParams = {
  page?: number;
  limit?: number;
  sort?: string;
  order?: string;
  search?: string;
};

export type TUserPaginateResponse = TResponsePaginate<TUserItem>;
export type TUserDetailResponse = TResponseData<TUserItem>;

export type TUserActivateRequest = {
  id: string;
  is_active: boolean;
};

export type TUserActivateResponse = {
  message: string;
  version: string;
};

export type TUserCreateResponse = {
  message: string;
  version: string;
};

export type TUserUpdateResponse = {
  message: string;
  data: TUserItem;
  version: string;
};

export type TUserDeleteResponse = {
  message: string;
  version: string;
};
