import { TResponseData } from "@/commons/types/response";

export type TExamAnswerRequest = {
  test_id: string;
  user_id: string;
  answers: Array<{
    question_id: string;
    option_id: string;
  }>;
};

export type TExamAnswerResponse = TResponseData<{
  id: string;
  test_id: string;
  user_id: string;
}>;

export type TTestAnswerDetailResponse = TResponseData<{
  id: string;
  test_id: string;
  user_id: string;
  score: number;
  created_at: string;
  updated_at: string;
  questions: Array<{
    discussion: string;
    discussion_image_url: string;
    id: string;
    options: Array<{
      id: string;
      label: string;
      is_user_selected: boolean;
      is_correct: boolean;
      image_url: string;
    }>;
    question: string;
    question_image_url: string;
  }>;
}>;
