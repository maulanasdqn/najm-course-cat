import { TResponseData, TResponsePaginate } from "@/commons/types/response";
import { TPermissionItem } from "../permission/type";

export type TRoleItem = {
  created_at: string;
  id: string;
  name: string;
  permissions: Array<TPermissionItem>;
  updated_at: string;
};

export type TRoleCreateRequest = Omit<
  TRoleItem,
  "id" | "created_at" | "updated_at" | "permissions"
>;

export type TRoleUpdateRequest = Omit<TRoleItem, "created_at" | "updated_at" | "permissions">;

export type TRoleGetRequest = {
  page?: number;
  limit?: number;
  sort?: string;
  order?: string;
  search?: string;
};

export type TRoleListResponse = TResponsePaginate<TRoleItem>;

export type TRoleDetailResponse = TResponseData<TRoleItem>;
