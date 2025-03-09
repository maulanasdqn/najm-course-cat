import { useQuery } from "@tanstack/react-query";
import { getTestAnswer } from "@/api/test";
import { QUERY_KEY } from "@/commons/constants/query-key";
import { dummyTestAnswerData } from "../_data/dummy";

export const useGetTestAnswer = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.TESTS.DETAIL, id],
    queryFn: () => {
      // Return dummy data if the API is down
      return Promise.resolve(dummyTestAnswerData);
      // To use real API, uncomment below and comment above
      // return getTestAnswer(id);
    },
  });
};
