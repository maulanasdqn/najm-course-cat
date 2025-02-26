import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSessionTest } from "@/api/session-test";
import { QUERY_KEY } from "@/commons/constants/query-key";
import { TSessionTestCreateRequest } from "@/api/session-test/type";
import toast from "react-hot-toast";
import { ROUTES } from "@/commons/constants/routes";
import { useNavigate } from "react-router-dom";
import { TErrorResponse } from "@/commons/types/error";

export const useCreateSessionTest = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TSessionTestCreateRequest) => createSessionTest(data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.SESSION_TESTS.LIST],
      });
      toast.success(res.message || "Session test berhasil dibuat");
      navigate(ROUTES.ADMIN.SESSION_TESTS.LIST.URL);
    },
    onError: (error: TErrorResponse) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });
};
