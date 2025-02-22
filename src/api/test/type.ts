import { TResponseData, TResponsePaginate } from "@/commons/types/response";
import {
  CreateTestFormData,
  UpdateTestFormData,
} from "@/app/(admin)/tests/_schemas/test-form.schema";

export type TTestItem = {
  id: string;
  session_id: string;
  label: string;
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
};

export type TTestPaginateResponse = TResponsePaginate<TTestItem>;
export type TTestDetailResponse = TResponseData<TTestItem>;

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
