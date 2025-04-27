import { api } from "@/libs/axios/api";
import { TExamAnswerRequest, TExamAnswerResponse, TTestAnswerDetailResponse } from "./type";

export const answerExam = async (payload: TExamAnswerRequest): Promise<TExamAnswerResponse> => {
  const { data } = await api.post(`/v1/answers/create`, payload);
  return data;
};

export const getTestAnswer = async (id: string): Promise<TTestAnswerDetailResponse> => {
  const { data } = await api.get(`/v1/answers/detail/${id}`);
  return data;
};
