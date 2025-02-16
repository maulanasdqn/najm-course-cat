import { TResponseData, TResponsePaginate } from "@/commons/types/response";

export type TExamItem = {
  id: string;
  title: string;
  questions: Array<{
    id: string;
    label: string;
    options: Array<{
      id: string;
      label: string;
      is_correct: boolean;
    }>;
  }>;
};

export type TExamListResponse = TResponsePaginate<Omit<TExamItem, "questions">>;
export type TExamDetailResponse = TResponseData<TExamItem>;

export type TExamAnswerRequest = {
  id: string;
  questions: Array<{
    id: string;
    option_id: string; // option id
  }>;
};
