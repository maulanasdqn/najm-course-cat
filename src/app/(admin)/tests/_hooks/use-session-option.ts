import { getSessionTests } from "@/api/session-test";
import { TGetSessionTestsParams } from "@/api/session-test/type";
import { useQuery } from "@tanstack/react-query";

export const useSessionOption = (params?: TGetSessionTestsParams) => {
  return useQuery({
    queryKey: ["session-option"],
    queryFn: () => getSessionTests(params),
    select: (data) =>
      data.data.map((session) => ({ value: session.id, label: session.session_name })),
  });
};
