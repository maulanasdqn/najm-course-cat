import { TResponseData, TResponsePaginate } from "@/commons/types/response";

export type TPermissionItem = {
  created_at: string;
  id: string;
  name: string;
  updated_at: string;
};

export type TPermissionCreateRequest = Omit<
  TPermissionItem,
  "id" | "created_at" | "updated_at" | "permissions"
>;

export type TPermissionUpdateRequest = Omit<
  TPermissionItem,
  "created_at" | "updated_at" | "permissions"
>;

export type TGetPermissionsParams = {
  page?: number;
  per_page?: number;
  sort?: string;
  order?: string;
  search?: string;
};

export type TPermissionListResponse = TResponsePaginate<TPermissionItem>;

export type TPermissionDetailResponse = TResponseData<TPermissionItem>;

export type ApiError = {
  response?: {
    data?: {
      message?: string;
    };
  };
};
