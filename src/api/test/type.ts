import { TResponseData, TResponsePaginate } from "@/commons/types/response";
import {
  CreateTestFormData,
  UpdateTestFormData,
} from "@/app/(admin)/tests/_schemas/test-form.schema";

export type TTestItem = {
  id: string;
  category: string;
  test_name: string;
  question_count: number;
  created_at: string;
  updated_at: string;
};

export type TTestCreateRequest = CreateTestFormData;
export type TTestUpdateRequest = UpdateTestFormData;

export type TGetTestsParams = {
  page?: number;
  limit?: number;
  sort?: string;
  order?: string;
  search?: string;
  filter?: string;
  filter_by?: string;
};

export type TTestPaginateResponse = TResponsePaginate<TTestItem>;
export type TTestDetailResponse = TResponseData<{
  created_at: string;
  id: string;
  category?: string;
  questions: {
    discussion: string;
    discussion_image_url: string;
    id: string;
    image_url: string;
    options: {
      id: string;
      label: string;
      image_url: string;
      is_correct: boolean;
      points?: number;
    }[];
    question: string;
  }[];
  session_id: string;
  test_name: string;
  start_date: string;
  end_date: string;
  updated_at: string;
}>;

export type TTestCreateResponse = {
  message: string;
  version: string;
};

export type TTestUpdateResponse = {
  message: string;
  data: TTestItem;
  version: string;
};

export type TTestDeleteResponse = {
  message: string;
  version: string;
};

export type TExamAnswerRequest = {
  test_id: string;
  questions: Array<{
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
  created_at: string;
  updated_at: string;
  questions: Array<{
    discussion: string;
    discussion_image_url: string;
    id: string;
    options: Array<{
      id: string;
      label: string;
      is_selected: boolean;
      is_correct: boolean;
    }>;
    question: string;
  }>;
}>;
