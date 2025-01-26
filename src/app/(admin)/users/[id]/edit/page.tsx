import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getUser, updateUser } from "../../../../../api/user";
import { TUserUpdateRequest } from "../../../../../api/user/type";
import { QUERY_KEY } from "../../../../../commons/constants/query-key";
import { ROUTES } from "../../../../../commons/constants/routes";
import { UserForm, UserFormData } from "../../components/user-form";

export default function EditUserPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data: userData, isLoading: isLoadingUser } = useQuery({
        queryKey: [QUERY_KEY.USERS.DETAIL, id],
        queryFn: () => getUser(id!),
        enabled: !!id,
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (data: TUserUpdateRequest) => updateUser(id!, data),
        onSuccess: () => {
            navigate(ROUTES.ADMIN.IAM.USERS.LIST.URL);
        },
    });

    const handleSubmit = (formData: UserFormData) => {
        if (!id) return;
        // Add id to the form data for update
        mutate({
            ...formData,
            id,
        } as TUserUpdateRequest);
    };

    if (isLoadingUser) {
        return <div>Loading...</div>;
    }

    if (!userData) {
        return <div>User not found</div>;
    }

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Edit User</h1>
            </div>
            <div className="max-w-2xl rounded-lg border bg-white p-6">
                <UserForm
                    initialData={userData.data}
                    onSubmit={handleSubmit}
                    isLoading={isPending}
                    isEditMode
                />
            </div>
        </div>
    );
}