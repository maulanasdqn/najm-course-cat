import { TResponseData, TResponsePaginate } from "@/commons/types/response";
import { TRoleItem } from "../role/type";
import { CreateUserFormData, UpdateUserFormData } from "@/app/(admin)/users/_schemas/user-form.schema";

export type TUserItem = {
  avatar: string;
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
};

export type TUserCreateRequest = CreateUserFormData;
export type TUserUpdateRequest = UpdateUserFormData;

export type TGetUsersParams = {
  page?: number;
  limit?: number;
  sort?: string;
  order?: string;
  search?: string;
};

export type TUserPaginateResponse = TResponsePaginate<TUserItem>;
export type TUserDetailResponse = TResponseData<TUserItem>;

export type ApiError = {
  response?: {
    data?: {
      message?: string;
    };
  };
};

export type TUserActivateRequest = {
  id: string;
  is_active: boolean;
};
