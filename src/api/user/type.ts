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
