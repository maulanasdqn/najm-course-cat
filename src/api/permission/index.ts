import { api } from "@/libs/axios/api";
import { TResponseData } from "@/commons/types/response";
import {
  TPermissionCreateRequest,
  TPermissionDetailResponse,
  TGetPermissionsParams,
  TPermissionListResponse,
  TPermissionUpdateRequest,
} from "./type";

export const getPermissions = async (params: TGetPermissionsParams): Promise<TPermissionListResponse> => {
  const { data } = await api.get("/v1/permissions", { params });
  return data;
};

export const getPermission = async (id: string): Promise<TPermissionDetailResponse> => {
  const { data } = await api.get(`/v1/permissions/detail/${id}`);
  return data;
};

export const createPermission = async (data: TPermissionCreateRequest): Promise<TResponseData<null>> => {
  const response = await api.post("/v1/permissions/create", data);
  return response.data;
};

export const updatePermission = async (
  id: string,
  data: TPermissionUpdateRequest,
): Promise<TResponseData<null>> => {
  const response = await api.put(`/v1/permissions/update/${id}`, data);
  return response.data;
};

export const deletePermission = async (id: string): Promise<TResponseData<null>> => {
  const response = await api.delete(`/v1/permissions/delete/${id}`);
  return response.data;
};
