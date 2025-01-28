import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateRoleFormData, UpdateRoleFormData, createRoleSchema, updateRoleSchema } from "../_schemas/role-form.schema";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@/commons/constants/query-key";
import { getPermissions } from "@/api/permission";

interface RoleFormProps {
    onSubmit: (data: CreateRoleFormData | UpdateRoleFormData) => void;
    isLoading?: boolean;
    isEditMode?: boolean;
    defaultValues?: UpdateRoleFormData;
}

export function RoleForm({ onSubmit, isLoading, isEditMode, defaultValues }: RoleFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<CreateRoleFormData | UpdateRoleFormData>({
        resolver: zodResolver(isEditMode ? updateRoleSchema : createRoleSchema),
        defaultValues,
    });

    const { data: permissionsData } = useQuery({
        queryKey: [QUERY_KEY.PERMISSIONS.LIST],
        queryFn: () => getPermissions({ page: 1, limit: 100 }),
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Role Name
                </label>
                <input
                    type="text"
                    id="name"
                    {...register("name")}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                />
                {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Permissions
                </label>
                <div className="mt-2 space-y-2">
                    {permissionsData?.data.map((permission) => (
                        <div key={permission.id} className="flex items-center">
                            <input
                                type="checkbox"
                                id={permission.id}
                                value={permission.id}
                                {...register("permissions")}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label htmlFor={permission.id} className="ml-2 block text-sm text-gray-900">
                                {permission.name}
                            </label>
                        </div>
                    ))}
                </div>
                {errors.permissions && (
                    <p className="mt-1 text-sm text-red-600">{errors.permissions.message}</p>
                )}
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                    {isLoading ? "Loading..." : isEditMode ? "Update Role" : "Create Role"}
                </button>
            </div>
        </form>
    );
}