import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../commons/constants/routes";
import { TUserItem } from "../../../api/user/type";

export const columns: ColumnDef<TUserItem>[] = [
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
                        className="text-red-600 hover:underline"
                    >
                        Delete
                    </Link>
                </div>
            );
        },
    },
];