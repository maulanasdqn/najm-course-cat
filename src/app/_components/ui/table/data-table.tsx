import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    isLoading?: boolean;
    onSearch?: (query: string) => void;
    onSort?: (field: string, direction: "asc" | "desc") => void;
    onPageChange?: (page: number) => void;
    pagination?: {
        currentPage: number;
        pageSize: number;
        totalItems: number;
        totalPages: number;
    };
}

export function DataTable<TData, TValue>({
    columns,
    data,
    isLoading,
    onSearch,
    onSort,
    onPageChange,
    pagination,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);

    const handleSortingChange = (updater: SortingState | ((old: SortingState) => SortingState)) => {
        const newSorting = typeof updater === 'function' ? updater(sorting) : updater;
        setSorting(newSorting);
        if (newSorting.length > 0 && onSort) {
            onSort(newSorting[0].id, newSorting[0].desc ? "desc" : "asc");
        }
    };

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: handleSortingChange,
        state: {
            sorting,
        },
    });

    return (
        <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div className="w-full md:w-1/2">
                    <form className="flex items-center">
                        <label htmlFor="simple-search" className="sr-only">Search</label>
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="simple-search"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2"
                                placeholder="Search"
                                onChange={(e) => onSearch?.(e.target.value)}
                            />
                        </div>
                    </form>
                </div>
            </div>
            <div className="overflow-x-auto relative">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="px-4 py-3"
                                        onClick={header.column.getToggleSortingHandler()}
                                        style={{ cursor: header.column.getCanSort() ? 'pointer' : 'default' }}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                        {{
                                            asc: ' 🔼',
                                            desc: ' 🔽',
                                        }[header.column.getIsSorted() as string] ?? null}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="relative">
                        {isLoading ? (
                            <tr>
                                <td colSpan={columns.length} className="h-[300px]">
                                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                            <p className="text-gray-500">Loading...</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            table.getRowModel().rows.map((row) => (
                                <tr key={row.id} className="border-b">
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {pagination && (
                <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4">
                    <span className="text-sm font-normal text-gray-500">
                        Showing
                        <span className="font-semibold text-gray-900"> {((pagination.currentPage - 1) * pagination.pageSize) + 1}-{Math.min(pagination.currentPage * pagination.pageSize, pagination.totalItems)} </span>
                        of
                        <span className="font-semibold text-gray-900"> {pagination.totalItems}</span>
                    </span>
                    <ul className="inline-flex items-stretch -space-x-px">
                        <li>
                            <button
                                onClick={() => onPageChange?.(pagination.currentPage - 1)}
                                disabled={pagination.currentPage <= 1}
                                className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
                            >
                                <span className="sr-only">Previous</span>
                                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </li>
                        {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
                            <li key={pageNum}>
                                <button
                                    onClick={() => onPageChange?.(pageNum)}
                                    className={`flex items-center justify-center text-sm py-2 px-3 leading-tight ${pageNum === pagination.currentPage
                                            ? 'text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700'
                                            : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                                        }`}
                                >
                                    {pageNum}
                                </button>
                            </li>
                        ))}
                        <li>
                            <button
                                onClick={() => onPageChange?.(pagination.currentPage + 1)}
                                disabled={pagination.currentPage >= pagination.totalPages}
                                className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
                            >
                                <span className="sr-only">Next</span>
                                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    );
}