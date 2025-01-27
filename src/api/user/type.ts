import { TResponseData, TResponsePaginate } from "@/commons/types/response";
import { TRoleItem } from "../role/type";

export type TUserItem = {
  id: string;
  fullname: string;
  email: string;
  phone_number: string;
  avatar?: string;
  role: TRoleItem;
  created_at: string;
  updated_at: string;
};

export type TUserCreateRequest = {
  fullname: string;
  email: string;
  phone_number: string;
  password: string;
  role_id: string;
};

export type TUserUpdateRequest = {
  fullname?: string;
  email?: string;
  phone_number?: string;
  role_id?: string;
};

export type TGetUsersParams = {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: 'asc' | 'desc';
};

export type TUserPaginateResponse = TResponsePaginate<TUserItem>;

export type TUserDetailResponse = TResponseData<TUserItem>;
