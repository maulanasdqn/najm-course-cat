import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { getRoles } from "../../../../api/role";
import { TUserCreateRequest } from "../../../../api/user/type";
import { QUERY_KEY } from "../../../../commons/constants/query-key";

export type UserFormData = TUserCreateRequest;

interface UserFormProps {
    initialData?: Partial<UserFormData>;
    onSubmit: (data: UserFormData) => void;
    isLoading?: boolean;
    isEditMode?: boolean;
}

export function UserForm({ initialData, onSubmit, isLoading, isEditMode }: UserFormProps) {
    const { register, handleSubmit } = useForm<UserFormData>({
        defaultValues: initialData,
    });

    const { data: rolesData } = useQuery({
        queryKey: [QUERY_KEY.ROLES.LIST],
        queryFn: () => getRoles({ page: 1, limit: 100 }),
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Full Name
                </label>
                <input
                    type="text"
                    {...register("fullname")}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    type="email"
                    {...register("email")}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                </label>
                <input
                    type="tel"
                    {...register("phone_number")}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                />
            </div>

            {!isEditMode && (
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        {...register("password")}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Role
                </label>
                <select
                    {...register("role_id")}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                >
                    <option value="">Select a role</option>
                    {rolesData?.data.map((role) => (
                        <option key={role.id} value={role.id}>
                            {role.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                >
                    {isLoading ? "Saving..." : "Save"}
                </button>
            </div>
        </form>
    );
}