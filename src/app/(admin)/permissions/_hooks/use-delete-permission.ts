import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePermission } from "@/api/permission";
import { QUERY_KEY } from "@/commons/constants/query-key";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/commons/constants/routes";
import toast from "react-hot-toast";
import { createElement } from "react";
import { DeleteConfirmation } from "../../_components/delete-confirmation";
import { TErrorResponse } from "@/commons/types/error";

export const useDeletePermission = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deletePermission(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PERMISSIONS.LIST] });
      toast.success(res.message || "Permission berhasil dihapus");
      navigate(ROUTES.ADMIN.IAM.PERMISSIONS.LIST.URL);
    },
    onError: (error: TErrorResponse) => {
      toast.error(error.response?.data?.message || "Gagal menghapus permission");
    },
  });

  const handleDelete = (id: string) => {
    toast.custom(
      (t) =>
        createElement(DeleteConfirmation, {
          onConfirm: () => mutate(id),
          toastId: t.id,
          message: "Apakah Anda yakin ingin menghapus permission ini?",
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
