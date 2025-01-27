import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getUsers } from "../../../api/user";
import { QUERY_KEY } from "../../../commons/constants/query-key";
import { ROUTES } from "../../../commons/constants/routes";
import { DataTable } from "../../_components/ui/table/data-table";
import { columns } from "./columns";

export default function UsersPage() {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.USERS.LIST],
    queryFn: () => getUsers({ page: 1, limit: 10 }),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
      <DataTable columns={columns} data={data?.data ?? []} />
    </div>
  );
}
