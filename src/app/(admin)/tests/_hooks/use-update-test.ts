import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTest } from "@/api/test";
import { QUERY_KEY } from "@/commons/constants/query-key";
import { TTestUpdateRequest } from "@/api/test/type";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/commons/constants/routes";
import { TErrorResponse } from "@/commons/types/error";

export const useUpdateTest = (id: string) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TTestUpdateRequest) => updateTest(id, data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.TESTS.LIST],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.TESTS.DETAIL, id],
      });

      toast.success(res.message || "Test berhasil diperbarui");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.TESTS.DETAIL, id] });
      navigate(ROUTES.ADMIN.TESTS.LIST.URL);
    },
    onError: (error: TErrorResponse) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });
};
