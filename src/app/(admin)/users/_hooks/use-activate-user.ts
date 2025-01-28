import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activateUser } from "@/api/user";
import { QUERY_KEY } from "@/commons/constants/query-key";

export const useActivateUser = () => {
    const queryClient = useQueryClient();

    const { mutate: handleActivate } = useMutation({
        mutationFn: activateUser,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.USERS.LIST],
            });
        },
    });

    return { handleActivate };
};