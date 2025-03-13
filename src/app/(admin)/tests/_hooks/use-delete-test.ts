import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTest } from "@/api/test";
import { QUERY_KEY } from "@/commons/constants/query-key";
import toast from "react-hot-toast";
import { TErrorResponse } from "@/commons/types/error";
import { createElement } from "react";
import { DeleteConfirmation } from "../../_components/delete-confirmation";

export const useDeleteTest = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
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

  const handleDelete = (id: string) => {
    toast.custom(
      (t) =>
        createElement(DeleteConfirmation, {
          onConfirm: () => mutate(id),
          toastId: t.id,
          message: "Apakah Anda yakin ingin menghapus test ini?",
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
