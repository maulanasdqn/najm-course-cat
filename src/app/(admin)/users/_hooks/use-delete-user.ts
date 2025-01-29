import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "@/api/user";
import { QUERY_KEY } from "@/commons/constants/query-key";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/commons/constants/routes";
import toast from "react-hot-toast";
import { createElement } from "react";
import { DeleteConfirmation } from "../../_components/delete-confirmation";
import { TErrorResponse } from "@/commons/types/error";

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate, isPending } = useMutation({
        mutationFn: ({ id }: { id: string }) => deleteUser(id),
        onSuccess: (res) => {
            toast.success(res.message || "User berhasil dihapus");
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USERS.LIST] });
            navigate(ROUTES.ADMIN.IAM.USERS.LIST.URL);
        },
        onError: (error: TErrorResponse) => {
            toast.error(error.response?.data?.message || "Gagal menghapus pengguna");
        },
    });

    const handleDelete = (id: string) => {
        toast.custom(
            (t) => createElement(DeleteConfirmation, {
                onConfirm: () => mutate({ id }),
                toastId: t.id,
                message: "Apakah Anda yakin ingin menghapus pengguna ini?"
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