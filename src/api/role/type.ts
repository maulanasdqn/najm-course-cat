import { TResponseData, TResponsePaginate } from "@/commons/types/response";
import { TPermissionItem } from "../permission/type";

export type TRoleItem = {
  created_at: string;
  id: string;
  name: string;
  permissions: Array<TPermissionItem>;
  updated_at: string;
};

// TODO: Create form schema for role create/update
export type TRoleCreateRequest = {
  name: string;
  permission_ids: string[];
};

export type TRoleUpdateRequest = {
  id: string;
  name: string;
  permissions: string[];
};

export type TGetRolesParams = {
  page?: number;
  limit?: number;
  sort?: string;
  order?: string;
  search?: string;
};

export type TRolePaginateResponse = TResponsePaginate<TRoleItem>;
export type TRoleDetailResponse = TResponseData<TRoleItem>;

export type ApiError = {
  response?: {
    data?: {
      message?: string;
    };
  };
};
