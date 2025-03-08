import { TResponseData, TResponsePaginate } from "@/commons/types/response";
import {
  CreateSessionTestFormData,
  UpdateSessionTestFormData,
} from "@/app/(admin)/session-tests/_schemas/session-test-form.schema";

export type TSessionTestItem = {
  id: string;
  session_name: string;
  student_type: string;
  category: string;
  test_count: number;
  description: string;
  is_active: boolean;
  tests: {
    id?: string;
    test_name: string;
    question_count: number;
    weight?: string;
    multiplier?: string;
    start_date?: string;
    end_date?: string;
  }[];
  created_at: string;
  updated_at: string;
};

export type TSessionTestCreateRequest = CreateSessionTestFormData;
export type TSessionTestUpdateRequest = UpdateSessionTestFormData;

export type TGetSessionTestsParams = {
  page?: number;
  limit?: number;
  sort?: string;
  order?: string;
  search?: string;
};

export type TSessionTestPaginateResponse = TResponsePaginate<TSessionTestItem>;
export type TSessionTestDetailResponse = TResponseData<TSessionTestItem>;

export type TSessionTestCreateResponse = {
  message: string;
  version: string;
};

export type TSessionTestUpdateResponse = {
  message: string;
  data: TSessionTestItem;
  version: string;
};

export type TSessionTestDeleteResponse = {
  message: string;
  version: string;
};
