import { Link } from "react-router-dom";
import { ROUTES } from "@/commons/constants/routes";
import { DataTable } from "@/app/_components/ui/table/data-table";
import { useGetTests } from "./_hooks/use-get-tests";
import { useTableParams } from "@/app/_hooks/use-table-params";
import { useDeleteTest } from "./_hooks/use-delete-test";
import { ColumnDef } from "@tanstack/react-table";
import { TTestItem } from "@/api/test/type";
import { Guard } from "@/app/_components/ui/guard";
import LoadingOverlay from "@/app/_components/ui/loading-overlay";

export default function TestsPage() {
  const { params, setParams } = useTableParams();
  const { data, isLoading } = useGetTests(params);
  const { handleDelete, isDeleting } = useDeleteTest();

  const columns: ColumnDef<TTestItem>[] = [
    {
      accessorKey: "test_name",
      header: "Nama Tes",
    },
    {
      accessorKey: "question_count",
      header: "Jumlah Pertanyaan",
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
            <Guard permissions={[]}>
              <Link
                to={ROUTES.ADMIN.TESTS.DETAIL.URL.replace(":id", id)}
                className="text-blue-600 hover:underline"
              >
                Detail
              </Link>
            </Guard>
            <Guard permissions={[]}>
              <Link
                to={ROUTES.ADMIN.TESTS.UPDATE.URL.replace(":id", id)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </Link>
            </Guard>
            <Guard permissions={[]}>
              <div
                onClick={() => handleDelete(id)}
                className="text-red-600 hover:underline cursor-pointer"
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
      {isDeleting && <LoadingOverlay message="Deleting test..." />}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tests</h1>
        <Guard permissions={[]}>
          <Link
            to={ROUTES.ADMIN.TESTS.CREATE.URL}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Add Test
          </Link>
        </Guard>
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
