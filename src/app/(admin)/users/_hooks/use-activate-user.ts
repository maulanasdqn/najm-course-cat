import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activateUser } from "@/api/user";
import { QUERY_KEY } from "@/commons/constants/query-key";
import toast from "react-hot-toast";
import { TErrorResponse } from "@/commons/types/error";

export const useActivateUser = () => {
    const queryClient = useQueryClient();

    const { mutate: handleActivate } = useMutation({
        mutationFn: activateUser,
        onSuccess: (res) => {
            toast.success(res.message || "User berhasil diperbarui");
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.USERS.LIST],
            });
        },
        onError: (error: TErrorResponse) => {
            toast.error(error.response?.data?.message || error.message);
        },
    });

    return { handleActivate };
};