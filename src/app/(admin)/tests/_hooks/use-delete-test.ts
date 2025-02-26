import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTest } from "@/api/test";
import { QUERY_KEY } from "@/commons/constants/query-key";
import toast from "react-hot-toast";
import { TErrorResponse } from "@/commons/types/error";

export const useDeleteTest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTest(id),
    onSuccess: (res) => {
      toast.success(res.message || "Test berhasil dihapus");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.TESTS.LIST],
      });
    },
    onError: (error: TErrorResponse) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });
};
