import { useQuery } from "@tanstack/react-query";
import { getTestAnswer } from "@/api/test";
import { QUERY_KEY } from "@/commons/constants/query-key";

export const useGetTestAnswer = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.TESTS.DETAIL, id],
    queryFn: () => getTestAnswer(id),
  });
};
