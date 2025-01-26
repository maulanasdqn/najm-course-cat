import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../../../api/user";
import { TUserCreateRequest } from "../../../../api/user/type";
import { ROUTES } from "../../../../commons/constants/routes";
import { UserForm } from "../components/user-form";

export default function CreateUserPage() {
    const navigate = useNavigate();

    const { mutate, isPending } = useMutation({
        mutationFn: (data: TUserCreateRequest) => createUser(data),
        onSuccess: () => {
            navigate(ROUTES.ADMIN.IAM.USERS.LIST.URL);
        },
    });

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Create User</h1>
            </div>
            <div className="max-w-2xl rounded-lg border bg-white p-6">
                <UserForm onSubmit={mutate} isLoading={isPending} />
            </div>
        </div>
    );
}