import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRole } from "@/api/role";
import { QUERY_KEY } from "@/commons/constants/query-key";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/commons/constants/routes";
import toast from "react-hot-toast";
import { createElement } from "react";
import { DeleteConfirmation } from "../../_components/delete-confirmation";
import { TErrorResponse } from "@/commons/types/error";

export const useDeleteRole = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate, isPending } = useMutation({
        mutationFn: (id: string) => deleteRole(id),
        onSuccess: (res) => {
            toast.success(res.message || "Role berhasil dihapus");
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ROLES.LIST] });
            navigate(ROUTES.ADMIN.IAM.ROLES.LIST.URL);
        },
        onError: (error: TErrorResponse) => {
            toast.error(error.response?.data?.message || "Gagal menghapus role");
        },
    });

    const handleDelete = (id: string) => {
        toast.custom(
            (t) => createElement(DeleteConfirmation, {
                onConfirm: () => mutate(id),
                toastId: t.id,
                message: "Apakah Anda yakin ingin menghapus role ini?"
            }),
            {
                duration: Infinity,
            }
        );
    };

    return {
        handleDelete,
        isDeleting: isPending,
    };
};