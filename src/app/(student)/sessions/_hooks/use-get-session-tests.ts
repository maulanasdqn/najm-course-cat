import { useQuery } from "@tanstack/react-query";
import { getSessionTests } from "@/api/session-test";
import { QUERY_KEY } from "@/commons/constants/query-key";
import { TGetSessionTestsParams } from "@/api/session-test/type";

export const useGetSessionTests = (params: TGetSessionTestsParams) => {
  return useQuery({
    queryKey: [
      QUERY_KEY.SESSION_TESTS.LIST,
      params.page,
      params.limit,
      params.search,
      params.sort,
      params.order,
    ],
    queryFn: () => getSessionTests(params),
  });
};
