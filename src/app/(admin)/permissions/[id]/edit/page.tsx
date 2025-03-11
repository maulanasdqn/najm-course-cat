import { useParams } from "react-router-dom";
import { PermissionForm } from "../../_components/permission-form";
import { useUpdatePermission } from "../../_hooks/use-update-permission";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@/commons/constants/query-key";
import { getPermission } from "@/api/permission";

export default function EditPermissionPage() {
  const { id } = useParams<{ id: string }>();
  const { handleSubmit, isLoading: isUpdating } = useUpdatePermission(id!);

  const { data: permissionData, isLoading: isFetching } = useQuery({
    queryKey: [QUERY_KEY.PERMISSIONS.DETAIL, id],
    queryFn: () => getPermission(id!),
  });

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit Permission</h1>
      </div>
      <div className="max-w-2xl rounded-md bg-white p-6 shadow">
        <PermissionForm
          onSubmit={handleSubmit}
          isLoading={isUpdating}
          isEditMode
          defaultValues={{
            name: permissionData?.data.name ?? "",
          }}
        />
      </div>
    </div>
  );
}
