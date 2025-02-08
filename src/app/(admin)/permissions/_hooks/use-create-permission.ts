import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPermission } from "@/api/permission";
import { QUERY_KEY } from "@/commons/constants/query-key";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/commons/constants/routes";
import { TPermissionForm } from "../_schemas/permission-form.schema";
import toast from "react-hot-toast";

export const useCreatePermission = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: TPermissionForm) => createPermission(data),
    onSuccess: (res) => {
      toast.success(res.message || "Permission berhasil dibuat");
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
