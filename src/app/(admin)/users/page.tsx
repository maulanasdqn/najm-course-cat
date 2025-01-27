import { Link } from "react-router-dom";
import { useState } from "react";
import { ROUTES } from "../../../commons/constants/routes";
import { DataTable } from "../../_components/ui/table/data-table";
import { columns } from "./columns";
import { useGetUsers } from "./_hooks/use-get-users";

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useGetUsers({ page, limit, search });

  const handleSearch = (query: string) => {
    setSearch(query);
    setPage(1); // Reset to first page on new search
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
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
        pagination={{
          currentPage: page,
          pageSize: limit,
          totalItems: data?.meta.total ?? 0,
          totalPages: data?.meta.total_page ?? 0
        }}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
