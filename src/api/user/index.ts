import { api } from "@/libs/axios/api";
import {
  TGetUsersParams,
  TUserUpdateRequest,
  TUserDetailResponse,
  TUserCreateRequest,
  TUserPaginateResponse,
  TUserActivateRequest,
  TUserActivateResponse,
  TUserDeleteResponse,
  TUserUpdateResponse,
  TUserCreateResponse,
} from "./type";

export const getUsers = async (params: TGetUsersParams): Promise<TUserPaginateResponse> => {
  const { data } = await api.get("/v1/users", { params });
  return data;
};

export const getUser = async (id: string): Promise<TUserDetailResponse> => {
  const { data } = await api.get(`/v1/users/detail/${id}`);
  return data;
};

export const createUser = async (data: TUserCreateRequest): Promise<TUserCreateResponse> => {
  const response = await api.post("/v1/users/create", data);
  return response.data;
};

export const updateUser = async (
  id: string,
  data: TUserUpdateRequest,
): Promise<TUserUpdateResponse> => {
  const response = await api.put(`/v1/users/update/${id}`, data);
  return response.data;
};

export const deleteUser = async (id: string): Promise<TUserDeleteResponse> => {
  const response = await api.delete(`/v1/users/delete/${id}`);
  return response.data;
};

export const activateUser = async ({ id, is_active }: TUserActivateRequest): Promise<TUserActivateResponse> => {
  const response = await api.put(`/v1/users/activate/${id}`, { is_active });
  return response.data;
};
