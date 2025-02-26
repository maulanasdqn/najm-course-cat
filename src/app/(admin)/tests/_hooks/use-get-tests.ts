import { useQuery } from "@tanstack/react-query";
import { getTests } from "@/api/test";
import { QUERY_KEY } from "@/commons/constants/query-key";
import { TGetTestsParams } from "@/api/test/type";

export const useGetTests = (params: TGetTestsParams) => {
  return useQuery({
    queryKey: [
      QUERY_KEY.TESTS.LIST,
      params.page,
      params.limit,
      params.search,
      params.sort,
      params.order,
    ],
    queryFn: () => getTests(params),
  });
};
