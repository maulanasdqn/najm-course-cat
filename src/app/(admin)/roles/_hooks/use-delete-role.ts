import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRole } from "@/api/role";
import { QUERY_KEY } from "@/commons/constants/query-key";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/commons/constants/routes";
import toast from "react-hot-toast";
import { createElement } from "react";
import { ApiError } from "@/api/role/type";
import { DeleteConfirmation } from "../../_components/delete-confirmation";

export const useDeleteRole = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate, isPending } = useMutation({
        mutationFn: (id: string) => deleteRole(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ROLES.LIST] });
            toast.success("Role berhasil dihapus");
            navigate(ROUTES.ADMIN.IAM.ROLES.LIST.URL);
        },
        onError: (error: ApiError) => {
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