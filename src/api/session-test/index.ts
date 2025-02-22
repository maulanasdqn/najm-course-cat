import { api } from "@/libs/axios/api";
import {
  TGetSessionTestsParams,
  TSessionTestUpdateRequest,
  TSessionTestDetailResponse,
  TSessionTestCreateRequest,
  TSessionTestPaginateResponse,
  TSessionTestDeleteResponse,
  TSessionTestUpdateResponse,
  TSessionTestCreateResponse,
} from "./type";

export const getSessionTests = async (
  params: TGetSessionTestsParams,
): Promise<TSessionTestPaginateResponse> => {
  const { data } = await api.get("/v1/sessions", { params });
  return data;
};

export const getSessionTest = async (id: string): Promise<TSessionTestDetailResponse> => {
  const { data } = await api.get(`/v1/sessions/${id}`);
  return data;
};

export const createSessionTest = async (
  payload: TSessionTestCreateRequest,
): Promise<TSessionTestCreateResponse> => {
  const { data } = await api.post("/v1/sessions", payload);
  return data;
};

export const updateSessionTest = async (
  id: string,
  payload: TSessionTestUpdateRequest,
): Promise<TSessionTestUpdateResponse> => {
  const { data } = await api.put(`/v1/sessions/${id}`, payload);
  return data;
};

export const deleteSessionTest = async (id: string): Promise<TSessionTestDeleteResponse> => {
  const { data } = await api.delete(`/v1/sessions/${id}`);
  return data;
};
