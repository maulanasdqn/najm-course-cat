import { Link } from "react-router-dom";
import { ROUTES } from "../../../commons/constants/routes";
import { DataTable } from "../../_components/ui/table/data-table";
import { useGetUsers } from "./_hooks/use-get-users";
import { useTableParams } from "../../_hooks/use-table-params";
import { useDeleteUser } from "./_hooks/use-delete-user";
import { ColumnDef } from "@tanstack/react-table";
import { TUserItem } from "../../../api/user/type";

export default function UsersPage() {
  const { params, setParams } = useTableParams();
  const { data, isLoading } = useGetUsers(params);
  const { handleDelete } = useDeleteUser()

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
      accessorKey: "role.name",
      header: "Role",
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
        return (
          <div className="flex gap-2">
            <Link
              to={ROUTES.ADMIN.IAM.USERS.UPDATE.URL.replace(":id", row.original.id)}
              className="text-blue-600 hover:underline"
            >
              Edit
            </Link>
            <Link
              to="#"
              onClick={() => handleDelete(row.original.id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </Link>
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
    <div className="p-6">
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
          totalPages: data ? Math.ceil(data.meta.total / data.meta.per_page) : 0
        }}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
