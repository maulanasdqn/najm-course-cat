import { TResponseError } from "@/commons/types/response";
import {
  QueryClient,
  QueryKey,
  UseQueryOptions,
  useQuery as useQueryOriginal,
} from "@tanstack/react-query";

export const useQuery = <
  TQueryFnData = unknown,
  TError = TResponseError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  queryClient?: QueryClient,
) => {
  return useQueryOriginal<TQueryFnData, TError, TData, TQueryKey>(options, queryClient);
};
