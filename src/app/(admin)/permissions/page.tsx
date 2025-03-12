import { Link } from "react-router-dom";
import { ROUTES } from "@/commons/constants/routes";
import { DataTable } from "@/app/_components/ui/table/data-table";
import { useTableParams } from "@/app/_hooks/use-table-params";
import { ColumnDef } from "@tanstack/react-table";
import { TPermissionItem } from "@/api/permission/type";
import { useGetPermissions } from "./_hooks/use-get-permissions";
import { useDeletePermission } from "./_hooks/use-delete-permission";
import { Guard } from "@/app/_components/ui/guard";
import PermissionsEnum from "@/commons/enums/permission";
import LoadingOverlay from "@/app/_components/ui/loading-overlay";

export default function PermissionsPage() {
  const { params, setParams } = useTableParams();
  const { data, isLoading } = useGetPermissions(params);
  const { handleDelete } = useDeletePermission();

  const columns: ColumnDef<TPermissionItem>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const id = row.original.id;
        return (
          <div className="flex gap-2">
            <Guard permissions={[PermissionsEnum.UpdatePermissions]}>
              <Link
                to={ROUTES.ADMIN.IAM.PERMISSIONS.UPDATE.URL.replace(":id", id)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </Link>
            </Guard>
            <Guard permissions={[PermissionsEnum.DeletePermissions]}>
              <Link
                to="#"
                onClick={() => handleDelete(id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </Link>
            </Guard>
          </div>
        );
      },
    },
  ];

  const handleSearch = (query: string) => {
    setParams({
      search: query,
      page: 1,
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
      {isDeleting && <LoadingOverlay message="Deleting permission..." />}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Permissions</h1>
        <Link
          to={ROUTES.ADMIN.IAM.PERMISSIONS.CREATE.URL}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Add Permission
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
