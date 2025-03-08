import { Link } from "react-router-dom";
import { ROUTES } from "@/commons/constants/routes";
import { DataTable } from "@/app/_components/ui/table/data-table";
import { useGetSessionTests } from "./_hooks/use-get-session-tests";
import { useTableParams } from "@/app/_hooks/use-table-params";
import { useDeleteSessionTest } from "./_hooks/use-delete-session-test";
import { ColumnDef } from "@tanstack/react-table";
import { TSessionTestItem } from "@/api/session-test/type";
import { Guard } from "@/app/_components/ui/guard";
import { DeleteConfirmation } from "../_components/delete-confirmation";
import { createElement } from "react";
import toast from "react-hot-toast";

export default function SessionTestsPage() {
  const { params, setParams } = useTableParams();
  const { data, isLoading } = useGetSessionTests(params);
  const { mutate } = useDeleteSessionTest();

  const handleDelete = (id: string) => {
    toast.custom(
      (t) =>
        createElement(DeleteConfirmation, {
          onConfirm: () => mutate(id),
          toastId: t.id,
          message: "Apakah Anda yakin ingin menghapus sesi ini?",
        }),
      {
        duration: Infinity,
      },
    );
  };

  const columns: ColumnDef<TSessionTestItem>[] = [
    {
      accessorKey: "session_name",
      header: "Name",
    },
    {
      accessorKey: "student_type",
      header: "Jenis Siswa",
    },
    {
      accessorKey: "category",
      header: "Kategori",
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
                to={ROUTES.ADMIN.SESSION_TESTS.DETAIL.URL.replace(":id", id)}
                className="text-blue-600 hover:underline"
              >
                Detail
              </Link>
            </Guard>
            <Guard permissions={[]}>
              <Link
                to={ROUTES.ADMIN.SESSION_TESTS.UPDATE.URL.replace(":id", id)}
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
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Session Tests</h1>
        <Guard permissions={[]}>
          <Link
            to={ROUTES.ADMIN.SESSION_TESTS.CREATE.URL}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Add Session Test
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
