import { Link } from "react-router-dom";
import { ROUTES } from "../../../commons/constants/routes";
import { DataTable } from "../../_components/ui/table/data-table";
import { useGetUsers } from "./_hooks/use-get-users";
import { useTableParams } from "../../_hooks/use-table-params";
import { useDeleteUser } from "./_hooks/use-delete-user";
import { useActivateUser } from "./_hooks/use-activate-user";
import { ColumnDef } from "@tanstack/react-table";
import { TUserItem } from "../../../api/user/type";
import { Switch } from "../../_components/ui/inputs/switch";
import { Guard } from "@/app/_components/ui/guard";
import PermissionsEnum from "@/commons/enums/permission";
import LoadingOverlay from "@/app/_components/ui/loading-overlay";

export default function UsersPage() {
  const { params, setParams } = useTableParams();
  const { data, isLoading } = useGetUsers(params);
  const { handleDelete, isDeleting } = useDeleteUser();
  const { handleActivate, isActivating } = useActivateUser();

  const columns: ColumnDef<TUserItem>[] = [
    {
      accessorKey: "fullname",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      accessorKey: "is_active",
      header: "Status",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <Guard permissions={[PermissionsEnum.UpdateUsers]}>
            <Switch
              checked={user.is_active ?? false}
              onChange={(checked) => handleActivate({ id: user.id, is_active: checked })}
              disabled={isActivating}
            />
          </Guard>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) => {
        return new Date(row.getValue("created_at")).toLocaleDateString();
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const id = row.original.id;
        return (
          <div className="flex gap-2">
            <Guard permissions={[PermissionsEnum.ReadDetailUsers]}>
              <Link
                to={ROUTES.ADMIN.IAM.USERS.DETAIL.URL.replace(":id", id)}
                className="text-blue-600 hover:underline"
              >
                Detail
              </Link>
            </Guard>
            <Guard permissions={[PermissionsEnum.UpdateUsers]}>
              <Link
                to={ROUTES.ADMIN.IAM.USERS.UPDATE.URL.replace(":id", id)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </Link>
            </Guard>
            <Guard permissions={[PermissionsEnum.DeleteUsers]}>
              <div
                onClick={() => handleDelete(id)}
                className="text-red-600 hover:underline cursor-pointer"
                style={{ opacity: isDeleting ? 0.5 : 1 }}
              >
                Delete
              </div>
            </Guard>
          </div>
        );
      },
    },
  ];

  const handleSearch = (query: string) => {
    setParams({
      search: query,
      page: 1, // Reset to first page on new search
    });
  };

  const handleSort = (field: string, direction: "asc" | "desc") => {
    setParams({
      sort: field,
      order: direction,
    });
  };

  const handlePageChange = (page: number) => {
    setParams({ page });
  };

  return (
    <div className="p-6 relative">
      {isDeleting && <LoadingOverlay message="Deleting user..." />}
      {isActivating && <LoadingOverlay message="Activating user..." />}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Users</h1>
        <Link
          to={ROUTES.ADMIN.IAM.USERS.CREATE.URL}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Add User
        </Link>
      </div>
      <DataTable
        columns={columns}
        data={data?.data ?? []}
        isLoading={isLoading}
        onSearch={handleSearch}
        onSort={handleSort}
        initialSearch={params.search}
        pagination={{
          currentPage: params.page,
          pageSize: params.limit,
          totalItems: data?.meta.total ?? 0,
          totalPages: data ? Math.ceil(data.meta.total / data.meta.per_page) : 0,
        }}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
