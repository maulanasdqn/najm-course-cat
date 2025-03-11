import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getUser, updateUser } from "../../../../api/user";
import { TUserUpdateRequest } from "../../../../api/user/type";
import { QUERY_KEY } from "../../../../commons/constants/query-key";
import { ROUTES } from "../../../../commons/constants/routes";
import { UserForm } from "../_components/user-form";
import { UpdateUserFormData } from "../_schemas/user-form.schema";
import toast from "react-hot-toast";
import { TErrorResponse } from "@/commons/types/error";
import { queryClient } from "@/libs/react-query/react-query-client";

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
    onSuccess: (res) => {
      toast.success(res.message || "User berhasil diperbarui");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USERS.DETAIL, id] });
      navigate(ROUTES.ADMIN.IAM.USERS.LIST.URL);
    },
    onError: (error: TErrorResponse) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });

  const handleSubmit = (formData: UpdateUserFormData) => {
    if (!id) return;
    mutate(formData);
  };

  if (isLoadingUser) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>User not found</div>;
  }

  const initialData: Partial<UpdateUserFormData> = {
    avatar: userData.data.avatar,
    fullname: userData.data.fullname,
    email: userData.data.email,
    phone_number: userData.data.phone_number,
    role_id: userData.data.role.id,
    student_type: userData.data.student_type,
    referral_code: userData.data.referral_code,
    referred_by: userData.data.referred_by,
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit User</h1>
      </div>
      <div className="max-w-2xl rounded-lg border bg-white p-6">
        <UserForm
          initialData={initialData}
          onSubmit={handleSubmit}
          isLoading={isPending}
          isEditMode={true}
        />
      </div>
    </div>
  );
}
