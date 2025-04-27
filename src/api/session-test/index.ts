import { api } from "@/libs/axios/api";
import {
  TGetSessionTestsParams,
  TSessionUpdateRequest,
  TSessionDetailResponse,
  TSessionCreateRequest,
  TSessionPaginateResponse,
  TSessionDeleteResponse,
  TSessionUpdateResponse,
  TSessionCreateResponse,
} from "./type";

export const getSessionTests = async (
  params?: TGetSessionTestsParams,
): Promise<TSessionPaginateResponse> => {
  const { data } = await api.get("/v1/sessions", { params });
  return data;
};

export const getSessionTest = async (id: string): Promise<TSessionDetailResponse> => {
  const { data } = await api.get(`/v1/sessions/detail/${id}`);
  return data;
};

export const createSessionTest = async (
  payload: TSessionCreateRequest,
): Promise<TSessionCreateResponse> => {
  const { data } = await api.post("/v1/sessions/create", payload);
  return data;
};

export const updateSessionTest = async (
  id: string,
  payload: TSessionUpdateRequest,
): Promise<TSessionUpdateResponse> => {
  const { data } = await api.put(`/v1/sessions/update/${id}`, payload);
  return data;
};

export const deleteSessionTest = async (id: string): Promise<TSessionDeleteResponse> => {
  const { data } = await api.delete(`/v1/sessions/delete/${id}`);
  return data;
};