import { useQuery } from "@tanstack/react-query";
import { getSessionTest } from "@/api/session-test";
import { QUERY_KEY } from "@/commons/constants/query-key";

export const useGetSessionTest = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.SESSION_TESTS.DETAIL, id],
    queryFn: () => getSessionTest(id),
  });
};