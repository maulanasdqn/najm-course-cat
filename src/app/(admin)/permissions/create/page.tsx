import { PermissionForm } from "../components/permission-form";
import { useCreatePermission } from "../_hooks/use-create-permission";

export default function CreatePermissionPage() {
    const { handleSubmit, isLoading } = useCreatePermission();

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Create Permission</h1>
            </div>
            <div className="max-w-2xl rounded-md bg-white p-6 shadow">
                <PermissionForm onSubmit={handleSubmit} isLoading={isLoading} />
            </div>
        </div>
    );
}