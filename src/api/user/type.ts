import { TResponseData, TResponsePaginate } from "@/commons/types/response";
import { TRoleItem } from "../role/type";

export type TUserItem = {
  avatar: string;
  created_at: string;
  email: string;
  fullname: string;
  id: string;
  password: string;
  phone_number: string;
  referral_code: string;
  referred_by: string;
  role: TRoleItem;
  updated_at: string;
};

export type TUserCreateRequest = Omit<TUserItem, "id" | "created_at" | "updated_at" | "roles">;

export type TUserUpdateRequest = Omit<TUserItem, "created_at" | "updated_at" | "roles">;

export type TGetUsersParams = {
  page?: number;
  limit?: number;
  sort?: string;
  order?: string;
  search?: string;
};

export type TUserPaginateResponse = TResponsePaginate<TUserItem>;

export type TUserDetailResponse = TResponseData<TUserItem>;
