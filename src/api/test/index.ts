import { api } from "@/libs/axios/api";
import {
  TGetTestsParams,
  TTestUpdateRequest,
  TTestDetailResponse,
  TTestCreateRequest,
  TTestPaginateResponse,
  TTestDeleteResponse,
  TTestUpdateResponse,
  TTestCreateResponse,
  TExamAnswerRequest,
  TExamAnswerResponse,
} from "./type";

export const getTests = async (params: TGetTestsParams): Promise<TTestPaginateResponse> => {
  const { data } = await api.get("/v1/tests", { params });
  return data;
};

export const getTest = async (id: string): Promise<TTestDetailResponse> => {
  const { data } = await api.get(`/v1/tests/detail/${id}`);
  return data;
};

export const createTest = async (payload: TTestCreateRequest): Promise<TTestCreateResponse> => {
  const { data } = await api.post("/v1/tests/create", payload);
  return data;
};

export const updateTest = async (
  id: string,
  payload: TTestUpdateRequest,
): Promise<TTestUpdateResponse> => {
  const { data } = await api.put(`/v1/tests/update/${id}`, payload);
  return data;
};

export const deleteTest = async (id: string): Promise<TTestDeleteResponse> => {
  const { data } = await api.delete(`/v1/tests/delete/${id}`);
  return data;
};

export const answerExam = async (payload: TExamAnswerRequest): Promise<TExamAnswerResponse> => {
  return Promise.resolve({
    status_code: 200,
    message: "Exam answered successfully",
  });
  const { data } = await api.post(`/v1/tests/answer/create`, payload);
  return data;
};
