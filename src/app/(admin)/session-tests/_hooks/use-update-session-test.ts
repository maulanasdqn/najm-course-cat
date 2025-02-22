import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSessionTest } from "@/api/session-test";
import { QUERY_KEY } from "@/commons/constants/query-key";
import { TSessionTestUpdateRequest } from "@/api/session-test/type";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/commons/constants/routes";

export const useUpdateSessionTest = (id: string) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TSessionTestUpdateRequest) => updateSessionTest(id, data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.SESSION_TESTS.LIST],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.SESSION_TESTS.DETAIL, id],
      });

      toast.success(res.message || "Session test berhasil diperbarui");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.SESSION_TESTS.DETAIL, id] });
      navigate(ROUTES.ADMIN.SESSION_TESTS.LIST.URL);
    },
  });
};
