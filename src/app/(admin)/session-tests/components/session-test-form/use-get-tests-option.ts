import { useQuery } from "@tanstack/react-query";
import { getTests } from "@/api/test";
import { QUERY_KEY } from "@/commons/constants/query-key";
import { TGetTestsParams } from "@/api/test/type";

export const useGetTestsOption = (params: TGetTestsParams) => {
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
    select: (data) => data.data.map((item) => ({ label: item.test_name, value: item.id })),
  });
};
