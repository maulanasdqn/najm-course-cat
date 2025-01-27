import { Link } from "react-router-dom";
import { ROUTES } from "../../../commons/constants/routes";
import { DataTable } from "../../_components/ui/table/data-table";
import { columns } from "./columns";
import { useGetUsers } from "./_hooks/use-get-users";
import { useTableParams } from "../../_hooks/use-table-params";

export default function UsersPage() {
  const { params, setParams } = useTableParams();
  const { data, isLoading } = useGetUsers(params);

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
