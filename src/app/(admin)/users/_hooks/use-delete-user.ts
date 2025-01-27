import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "@/api/user";
import { QUERY_KEY } from "@/commons/constants/query-key";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/commons/constants/routes";
import toast from "react-hot-toast";
import { DeleteConfirmation } from "../components/delete-confirmation";
import { createElement } from "react";
import { ApiError } from "@/api/user/type";

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate, isPending } = useMutation({
        mutationFn: ({ id }: { id: string }) => deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USERS.LIST] });
            toast.success("Pengguna berhasil dihapus");
            navigate(ROUTES.ADMIN.IAM.USERS.LIST.URL);
        },
        onError: (error: ApiError) => {
            toast.error(error.response?.data?.message || "Gagal menghapus pengguna");
        },
    });

    const handleDelete = (id: string) => {
        toast.custom(
            (t) => createElement(DeleteConfirmation, {
                onConfirm: () => mutate({ id }),
                toastId: t.id,
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