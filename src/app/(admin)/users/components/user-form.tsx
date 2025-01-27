import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getRoles } from "../../../../api/role";
import { QUERY_KEY } from "../../../../commons/constants/query-key";
import { createUserSchema, updateUserSchema, CreateUserFormData, UpdateUserFormData } from "../_schemas/user-form.schema";
import { InputText } from "@/app/_components/ui/inputs/text";
import { Select } from "@/app/_components/ui/inputs/select";

// Create Form Component
interface CreateFormProps {
    initialData?: Partial<CreateUserFormData>;
    onSubmit: (data: CreateUserFormData) => void;
    isLoading?: boolean;
}

function CreateUserForm({ initialData, onSubmit, isLoading }: CreateFormProps) {
    const form = useForm<CreateUserFormData>({
        resolver: zodResolver(createUserSchema),
        defaultValues: initialData,
    });

    const { data: rolesData } = useQuery({
        queryKey: [QUERY_KEY.ROLES.LIST],
        queryFn: () => getRoles({ page: 1, limit: 100 }),
    });

    const roleOptions = rolesData?.data.map(role => ({
        value: role.id,
        label: role.name
    })) ?? [];

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <InputText
                name="fullname"
                control={form.control}
                label="Full Name"
                placeholder="Enter full name"
            />

            <InputText
                name="email"
                control={form.control}
                label="Email"
                type="email"
                placeholder="Enter email address"
            />

            <InputText
                name="phone_number"
                control={form.control}
                label="Phone Number"
                type="tel"
                placeholder="Enter phone number"
            />

            <InputText
                name="password"
                control={form.control}
                label="Password"
                type="password"
                placeholder="Enter password"
            />

            <Select
                name="role_id"
                control={form.control}
                label="Role"
                placeholder="Select a role"
                options={roleOptions}
            />

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

// Edit Form Component
interface EditFormProps {
    initialData?: Partial<UpdateUserFormData>;
    onSubmit: (data: UpdateUserFormData) => void;
    isLoading?: boolean;
}

function EditUserForm({ initialData, onSubmit, isLoading }: EditFormProps) {
    const form = useForm<UpdateUserFormData>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: initialData,
    });

    const { data: rolesData } = useQuery({
        queryKey: [QUERY_KEY.ROLES.LIST],
        queryFn: () => getRoles({ page: 1, limit: 100 }),
    });

    const roleOptions = rolesData?.data.map(role => ({
        value: role.id,
        label: role.name
    })) ?? [];

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <InputText
                name="fullname"
                control={form.control}
                label="Full Name"
                placeholder="Enter full name"
            />

            <InputText
                name="email"
                control={form.control}
                label="Email"
                type="email"
                placeholder="Enter email address"
            />

            <InputText
                name="phone_number"
                control={form.control}
                label="Phone Number"
                type="tel"
                placeholder="Enter phone number"
            />

            <Select
                name="role_id"
                control={form.control}
                label="Role"
                placeholder="Select a role"
                options={roleOptions}
            />

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

type UserFormProps = {
    isEditMode: true;
    initialData?: Partial<UpdateUserFormData>;
    onSubmit: (data: UpdateUserFormData) => void;
    isLoading?: boolean;
} | {
    isEditMode: false;
    initialData?: Partial<CreateUserFormData>;
    onSubmit: (data: CreateUserFormData) => void;
    isLoading?: boolean;
};

export function UserForm(props: UserFormProps) {
    if (props.isEditMode) {
        return <EditUserForm {...props} />;
    }
    return <CreateUserForm {...props} />;
}