import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getRole, updateRole } from "../../../../../api/role";
import { QUERY_KEY } from "../../../../../commons/constants/query-key";
import { ROUTES } from "../../../../../commons/constants/routes";
import { RoleForm } from "../../components/role-form";
import { UpdateRoleFormData } from "../../_schemas/role-form.schema";
import toast from "react-hot-toast";
import { TErrorResponse } from "@/commons/types/error";

export default function EditRolePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: roleData, isLoading: isLoadingRole } = useQuery({
    queryKey: [QUERY_KEY.ROLES.DETAIL, id],
    queryFn: () => getRole(id!),
    enabled: !!id,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: UpdateRoleFormData) =>
      updateRole(id!, {
        id: id!,
        name: data.name,
        permissions: data.permissions,
      }),
    onSuccess: (res) => {
      toast.success(res.message || "Role berhasil diperbarui");
      navigate(ROUTES.ADMIN.IAM.ROLES.LIST.URL);
    },
    onError: (err: TErrorResponse) => {
      toast.error(err?.response?.data?.message as string);
    },
  });

  const handleSubmit = (formData: UpdateRoleFormData) => {
    if (!id) return;
    mutate(formData);
  };

  if (isLoadingRole) {
    return <div>Loading...</div>;
  }

  if (!roleData) {
    return <div>Role not found</div>;
  }

  const initialData: UpdateRoleFormData = {
    name: roleData.data.name,
    permissions: roleData.data.permissions.map((p) => p.id),
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit Role</h1>
      </div>
      <div className="max-w-2xl rounded-lg border bg-white p-6">
        <RoleForm
          defaultValues={initialData}
          onSubmit={handleSubmit}
          isLoading={isPending}
          isEditMode={true}
        />
      </div>
    </div>
  );
}
