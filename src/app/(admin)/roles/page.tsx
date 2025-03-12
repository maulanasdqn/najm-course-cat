import { Link } from "react-router-dom";
import { ROUTES } from "../../../commons/constants/routes";
import { DataTable } from "../../_components/ui/table/data-table";
import { useTableParams } from "../../_hooks/use-table-params";
import { ColumnDef } from "@tanstack/react-table";
import { TRoleItem } from "../../../api/role/type";
import { useGetRoles } from "./_hooks/use-get-roles";
import { useDeleteRole } from "./_hooks/use-delete-role";
import { Guard } from "@/app/_components/ui/guard";
import PermissionsEnum from "@/commons/enums/permission";
import LoadingOverlay from "@/app/_components/ui/loading-overlay";

export default function RolesPage() {
  const { params, setParams } = useTableParams();
  const { data, isLoading: isLoadingData } = useGetRoles(params);
  const { handleDelete, isDeleting } = useDeleteRole();

  const columns: ColumnDef<TRoleItem>[] = [
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
            <Guard permissions={[PermissionsEnum.UpdateRoles]}>
              <Link
                to={ROUTES.ADMIN.IAM.ROLES.UPDATE.URL.replace(":id", id)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </Link>
            </Guard>
            <Guard permissions={[PermissionsEnum.DeleteRoles]}>
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
      {isDeleting && <LoadingOverlay message="Deleting role..." />}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Roles</h1>
        <Link
          to={ROUTES.ADMIN.IAM.ROLES.CREATE.URL}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Add Role
        </Link>
      </div>
      <DataTable
        columns={columns}
        data={data?.data ?? []}
        isLoading={isLoadingData}
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
