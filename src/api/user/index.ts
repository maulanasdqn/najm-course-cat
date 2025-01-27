import { api } from "@/libs/axios/api";
import { TResponseData } from "@/commons/types/response";
import {
  TGetUsersParams,
  TUserUpdateRequest,
  TUserDetailResponse,
  TUserCreateRequest,
  TUserPaginateResponse,
} from "./type";

export const getUsers = async (params: TGetUsersParams): Promise<TUserPaginateResponse> => {
  const { data } = await api.get("/v1/users", { params });
  return data;
};

export const getUser = async (id: string): Promise<TUserDetailResponse> => {
  const { data } = await api.get(`/v1/users/${id}`);
  return data;
};

export const createUser = async (data: TUserCreateRequest): Promise<TResponseData<null>> => {
  const response = await api.post("/v1/users", data);
  return response.data;
};

export const updateUser = async (id: string, data: TUserUpdateRequest): Promise<TResponseData<null>> => {
  const response = await api.put(`/v1/users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id: string): Promise<TResponseData<null>> => {
  const response = await api.delete(`/v1/users/${id}`);
  return response.data;
};
