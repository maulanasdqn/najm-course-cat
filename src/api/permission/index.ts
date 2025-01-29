import { api } from "@/libs/axios/api";
import {
  TPermissionCreateRequest,
  TPermissionDetailResponse,
  TGetPermissionsParams,
  TPermissionListResponse,
  TPermissionUpdateRequest,
  TPermissionDeleteResponse,
} from "./type";
import { TUserCreateResponse, TUserUpdateResponse } from "../user/type";

export const getPermissions = async (params: TGetPermissionsParams): Promise<TPermissionListResponse> => {
  const { data } = await api.get("/v1/permissions", { params });
  return data;
};

export const getPermission = async (id: string): Promise<TPermissionDetailResponse> => {
  const { data } = await api.get(`/v1/permissions/detail/${id}`);
  return data;
};

export const createPermission = async (data: TPermissionCreateRequest): Promise<TUserCreateResponse> => {
  const response = await api.post("/v1/permissions/create", data);
  return response.data;
};

export const updatePermission = async (
  id: string,
  data: TPermissionUpdateRequest,
): Promise<TUserUpdateResponse> => {
  const response = await api.put(`/v1/permissions/update/${id}`, data);
  return response.data;
};

export const deletePermission = async (id: string): Promise<TPermissionDeleteResponse> => {
  const response = await api.delete(`/v1/permissions/delete/${id}`);
  return response.data;
};
