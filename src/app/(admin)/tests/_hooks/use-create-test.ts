import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTest } from "@/api/test";
import { QUERY_KEY } from "@/commons/constants/query-key";
import { TTestCreateRequest } from "@/api/test/type";
import toast from "react-hot-toast";
import { ROUTES } from "@/commons/constants/routes";
import { useNavigate } from "react-router-dom";
import { TErrorResponse } from "@/commons/types/error";

export const useCreateTest = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: TTestCreateRequest) => createTest(data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.TESTS.LIST],
      });
      toast.success(res.message || "Test berhasil dibuat");
      navigate(ROUTES.ADMIN.SESSION_TESTS.LIST.URL);
    },
    onError: (error: TErrorResponse) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });
  
  return {
    mutate: mutation.mutate,
    isLoading: mutation.isPending
  };
};
