import { getMe } from "@/api/user";
import { QUERY_KEY } from "@/commons/constants/query-key";
import { useQuery } from "@tanstack/react-query";

export const useMe = () => {
  return useQuery({
    queryKey: [QUERY_KEY.USERS.ME],
    queryFn: getMe,
  });
};
