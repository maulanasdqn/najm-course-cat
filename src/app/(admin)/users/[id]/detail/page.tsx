import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "../../../../../api/user";
import { QUERY_KEY } from "../../../../../commons/constants/query-key";
import { ROUTES } from "../../../../../commons/constants/routes";
import { useDeleteUser } from "../../_hooks/use-delete-user";

const getUpdateUrl = (id: string) => ROUTES.ADMIN.IAM.USERS.UPDATE.URL.replace(":id", id);

export default function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: userData, isLoading: isLoadingUser } = useQuery({
    queryKey: [QUERY_KEY.USERS.DETAIL, id],
    queryFn: () => getUser(id!),
    enabled: !!id,
  });

  const { handleDelete, isDeleting } = useDeleteUser();

  if (isLoadingUser) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>User not found</div>;
  }

  const user = userData.data;

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Detail User</h1>
        <div className="flex gap-2">
          <button
            onClick={() => navigate(getUpdateUrl(id!))}
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(id!)}
            disabled={isDeleting}
            className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isDeleting ? "Menghapus..." : "Hapus"}
          </button>
        </div>
      </div>
      <div className="max-w-2xl rounded-lg border bg-white p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nama</label>
            <p className="mt-1 text-sm text-gray-900">{user.fullname}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="mt-1 text-sm text-gray-900">{user.email}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Nomor Telp.</label>
            <p className="mt-1 text-sm text-gray-900">{user.phone_number}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <p className="mt-1 text-sm text-gray-900">{user.role.name}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Kategori</label>
            <p className="mt-1 text-sm text-gray-900">{user.student_type}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Kode Referal</label>
            <p className="mt-1 text-sm text-gray-900">{user.referral_code || "-"}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Kode Referal Pemberi</label>
            <p className="mt-1 text-sm text-gray-900">{user.referred_by || "-"}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Tanggal Dibuat</label>
            <p className="mt-1 text-sm text-gray-900">
              {new Date(user.created_at).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Terakhir Diperbarui</label>
            <p className="mt-1 text-sm text-gray-900">
              {new Date(user.updated_at).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
