export type TResponsePaginate<T> = {
  status_code: number;
  data: T[];
  meta: {
    page: number;
    per_page: number;
    total: number;
    total_page: number;
  };
  version: string;
};

export type TResponseData<T> = {
  status_code: number;
  data: T;
  version: string;
};

export type TResponseError = {
  status_code: number;
  error_message: string;
  stack_trace: string;
  errors: {
    key: string;
    message: string;
  }[];
  version: string;
};
