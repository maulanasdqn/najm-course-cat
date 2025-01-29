import { api } from "@/libs/axios/api";
import {
  TRoleCreateRequest,
  TRoleDetailResponse,
  TGetRolesParams,
  TRolePaginateResponse,
  TRoleUpdateRequest,
  TRoleCreateResponse,
  TRoleUpdateResponse,
  TRoleDeleteResponse,
} from "./type";

export const getRoles = async (params: TGetRolesParams): Promise<TRolePaginateResponse> => {
  const { data } = await api.get("/v1/roles", { params });
  return data;
};

export const getRole = async (id: string): Promise<TRoleDetailResponse> => {
  const { data } = await api.get(`/v1/roles/detail/${id}`);
  return data;
};

export const createRole = async (data: TRoleCreateRequest): Promise<TRoleCreateResponse> => {
  const response = await api.post("/v1/roles/create", data);
  return response.data;
};

export const updateRole = async (
  id: string,
  data: TRoleUpdateRequest,
): Promise<TRoleUpdateResponse> => {
  const response = await api.put(`/v1/roles/update/${id}`, data);
  return response.data;
};

export const deleteRole = async (id: string): Promise<TRoleDeleteResponse> => {
  const response = await api.delete(`/v1/roles/delete/${id}`);
  return response.data;
};
