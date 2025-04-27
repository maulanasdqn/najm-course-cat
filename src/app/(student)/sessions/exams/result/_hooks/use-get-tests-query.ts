import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@/commons/constants/query-key";
import { getTestAnswer } from "@/api/answer";

export const useGetTestAnswer = (id?: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.TESTS.DETAIL, id],
    queryFn: () => getTestAnswer(id!),
    enabled: !!id,
  });
};
