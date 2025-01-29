import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePermission } from "@/api/permission";
import { QUERY_KEY } from "@/commons/constants/query-key";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/commons/constants/routes";
import { TPermissionForm } from "../_schemas/permission-form.schema";
import toast from "react-hot-toast";

export const useUpdatePermission = (id: string) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: (data: TPermissionForm) => updatePermission(id, { ...data, id }),
        onSuccess: (res) => {
            toast.success(res.message || 'Permission berhasil diperbarui');
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.PERMISSIONS.LIST],
            });
            navigate(ROUTES.ADMIN.IAM.PERMISSIONS.LIST.URL);
        },
    });

    const handleSubmit = async (data: TPermissionForm) => {
        await mutation.mutateAsync(data);
    };

    return {
        handleSubmit,
        isLoading: mutation.isPending,
    };
};