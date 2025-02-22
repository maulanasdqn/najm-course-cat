import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSessionTest } from "@/api/session-test";
import { QUERY_KEY } from "@/commons/constants/query-key";
import toast from "react-hot-toast";

export const useDeleteSessionTest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteSessionTest(id),
    onSuccess: (res) => {
      toast.success(res.message || "Session test berhasil dihapus");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.SESSION_TESTS.LIST],
      });
    },
  });
};
