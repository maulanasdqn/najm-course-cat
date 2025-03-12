import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSessionTest } from "@/api/session-test";
import { QUERY_KEY } from "@/commons/constants/query-key";
import toast from "react-hot-toast";
import { TErrorResponse } from "@/commons/types/error";
import { createElement } from "react";
import { DeleteConfirmation } from "../../_components/delete-confirmation";

export const useDeleteSessionTest = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteSessionTest(id),
    onSuccess: (res) => {
      toast.success(res.message || "Session test berhasil dihapus");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.SESSION_TESTS.LIST],
      });
    },
    onError: (error: TErrorResponse) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });

  const handleDelete = (id: string) => {
    toast.custom(
      (t) =>
        createElement(DeleteConfirmation, {
          onConfirm: () => mutate(id),
          toastId: t.id,
          message: "Apakah Anda yakin ingin menghapus sesi ini?",
        }),
      {
        duration: Infinity,
      },
    );
  };

  return {
    handleDelete,
    isDeleting: isPending,
  };
};
