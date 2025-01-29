import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createRole } from "../../../../api/role";
import { ROUTES } from "../../../../commons/constants/routes";
import { RoleForm } from "../components/role-form";
import { CreateRoleFormData } from "../_schemas/role-form.schema";
import toast from "react-hot-toast";
import { TErrorResponse } from "@/commons/types/error";

export default function CreateRolePage() {
    const navigate = useNavigate();

    const { mutate, isPending } = useMutation({
        mutationFn: (data: CreateRoleFormData) => createRole({
            name: data.name,
            permission_ids: data.permissions
        }),
        onSuccess: (res) => {
            toast.success(res.message || "Role berhasil dibuat");
            navigate(ROUTES.ADMIN.IAM.ROLES.LIST.URL);
        },
        onError: (err: TErrorResponse) => {
            toast.error(err?.response?.data?.message as string);
        }
    });

    const handleSubmit = (data: CreateRoleFormData) => {
        mutate(data);
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Create Role</h1>
            </div>
            <div className="max-w-2xl rounded-lg border bg-white p-6">
                <RoleForm
                    onSubmit={handleSubmit}
                    isLoading={isPending}
                    isEditMode={false}
                />
            </div>
        </div>
    );
}