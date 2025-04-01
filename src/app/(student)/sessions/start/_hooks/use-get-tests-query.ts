import { useQuery } from "@tanstack/react-query";
import { getTest } from "@/api/test";
import { QUERY_KEY } from "@/commons/constants/query-key";

export const useGetTest = (id?: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.TESTS.DETAIL, id],
    queryFn: () => getTest(id!),
    enabled: !!id,
  });
};
