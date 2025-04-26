import { TResponseData, TResponsePaginate } from "@/commons/types/response";

// Test Item
export type TTestItem = {
  id: string;
  name: string;
  question_count: number;
  created_at: string;
  updated_at: string;
};

// Request type for creating a test
export type TTestCreateRequest = {
  name: string;
  questions: {
    question: string;
    discussion?: string;
    options: {
      label: string;
      is_correct: boolean;
      image_url?: string | null; // Optional field
    }[];
  }[];
};

// Request type for updating a test
export type TTestUpdateRequest = {
  id: string;
  name: string;
  questions: {
    id: string; // Assuming each question has an identifier
    question: string;
    discussion?: string;
    options: {
      id: string; // Assuming each option has an identifier
      label: string;
      is_correct: boolean;
      image_url?: string | null; // Optional field
    }[];
  }[];
};

// Paginated response for tests
export type TTestPaginateResponse = TResponsePaginate<TTestItem>;

// Response type for test detail
export type TTestDetailResponse = TResponseData<{
  id: string;
  name: string;
  question_count: number;
  created_at: string;
  updated_at: string;
  questions: {
    discussion: string;
    discussion_image_url?: string;
    id: string;
    image_url?: string;
    options: {
      id: string;
      label: string;
      image_url?: string;
      is_correct: boolean;
      points?: number;
    }[];
    question: string;
  }[];
  session_id?: string;
  start_date?: string;
  end_date?: string;
}>;

// Response type for create test
export type TTestCreateResponse = {
  message: string;
  version: string;
};

// Response type for update test
export type TTestUpdateResponse = {
  message: string;
  version: string;
};

// Response type for delete test
export type TTestDeleteResponse = {
  message: string;
  version: string;
};

// Adding the missing types that were in the original file but not in the new definition
export type TGetTestsParams = {
  page?: number;
  limit?: number;
  sort?: string;
  order?: string;
  search?: string;
  filter?: string;
  filter_by?: string;
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
