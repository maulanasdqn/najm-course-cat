import { TExamAnswerRequest, TExamDetailResponse, TExamItem, TExamListResponse } from "./type";
import questions from "./questions.json";

export const getExams = async (): Promise<TExamListResponse> => {
  return Promise.resolve({
    version: "1",
    status_code: 200,
    meta: {
      page: 1,
      per_page: 10,
      total: 4,
      total_page: 1,
    },
    data: [
      {
        id: "1",
        title: "Tes Kepribadian",
        status: "Belum Dikerjakan",
        score: null,
      },
      {
        id: "2",
        title: "Tes Verbal",
        status: "Sudah Dikerjakan",
        score: 85,
      },
      {
        id: "3",
        title: "Tes Intelegensi",
        status: "Belum Dikerjakan",
        score: null,
      },
      {
        id: "4",
        title: "Tes Penalaran",
        status: "Sudah Dikerjakan",
        score: 90,
      },
    ],
  });
};

export const getExam = async (id: string): Promise<TExamDetailResponse> => {
  console.log(id);
  return Promise.resolve({
    status_code: 200,
    version: "1",
    data: {
      id: "1",
      title: "Tes Kepribadian",
      questions: questions as TExamItem["questions"],
    },
  });
};

export const answerExam = async (
  id: string,
  payload: TExamAnswerRequest,
): Promise<{ status_code: number; message: string }> => {
  console.log(id, payload);
  return Promise.resolve({
    status_code: 200,
    message: "Exam answered successfully",
  });
};
