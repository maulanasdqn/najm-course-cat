import { TResponseData, TResponsePaginate } from "@/commons/types/response";
import { TTestItem } from "../test/type";

// Session Detail Item
export type TSessionItem = {
  id: string;
  name: string;
  category: string;
  description: string;
  student_type: string;
  tests_count: number;
  is_active: boolean;
  is_deleted: boolean;
  tests: {
    test_id: string;
    weight: number;
    multiplier: number;
    test?: TTestItem;
    start_date: string;
    end_date: string;
  }[];
  created_at: string;
  updated_at: string;
};

// Request type for creating a session
export type TSessionCreateRequest = {
  name: string;
  category: string;
  description: string;
  student_type: string;
  tests: {
    test_id: string;
    weight: number;
    multiplier: number;
    start_date: string;
    end_date: string;
  }[];
};

// Request type for updating a session
export type TSessionUpdateRequest = {
  id: string;
  name: string;
  category: string;
  description: string;
  student_type: string;
  is_active: boolean;
  is_deleted: boolean;
  tests: {
    test_id: string;
    weight: number;
    multiplier: number;
    start_date: string;
    end_date: string;
  }[];
};

// Paginated response for sessions
export type TSessionPaginateResponse = TResponsePaginate<TSessionItem>;

// Response type for session detail
export type TSessionDetailResponse = TResponseData<TSessionItem>;

// Response type for create session
export type TSessionCreateResponse = {
  message: string;
  version: string;
};

// Response type for update session
export type TSessionUpdateResponse = {
  message: string;
  version: string;
};

// Response type for delete session
export type TSessionDeleteResponse = {
  message: string;
  version: string;
};

// Parameters for fetching session tests
export type TGetSessionTestsParams = {
  page?: number;
  limit?: number;
  sort?: string;
  order?: string;
  search?: string;
};
