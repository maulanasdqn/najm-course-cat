import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../../../api/user";
import { ROUTES } from "../../../../commons/constants/routes";
import { UserForm } from "../components/user-form";
import { CreateUserFormData } from "../_schemas/user-form.schema";
import toast from "react-hot-toast";
import { TErrorResponse } from "@/commons/types/error";

export default function CreateUserPage() {
    const navigate = useNavigate();

    const { mutate, isPending } = useMutation({
        mutationFn: createUser,
        onSuccess: (res) => {
            toast.success(res.message || "User berhasil diperbarui");
            navigate(ROUTES.ADMIN.IAM.USERS.LIST.URL);
        },
        onError: (error: TErrorResponse) => {
            toast.error(error.response?.data?.message || error.message);
        },
    });

    const handleSubmit = (data: CreateUserFormData) => {
        mutate(data);
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Create User</h1>
            </div>
            <div className="max-w-2xl rounded-lg border bg-white p-6">
                <UserForm
                    onSubmit={handleSubmit}
                    isLoading={isPending}
                    isEditMode={false}
                />
            </div>
        </div>
    );
}