import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TPermissionForm, permissionFormSchema } from "../_schemas/permission-form.schema";
import LoadingOverlay from "@/app/_components/ui/loading-overlay";

interface PermissionFormProps {
  onSubmit: (data: TPermissionForm) => void;
  isLoading?: boolean;
  isEditMode?: boolean;
  defaultValues?: TPermissionForm;
}

export function PermissionForm({
  onSubmit,
  isLoading,
  isEditMode,
  defaultValues,
}: PermissionFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TPermissionForm>({
    resolver: zodResolver(permissionFormSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 relative">
      {isLoading && <LoadingOverlay message={isEditMode ? "Updating permission..." : "Creating permission..."} />}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Permission Name
        </label>
        <input
          type="text"
          id="name"
          {...register("name")}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Loading..." : isEditMode ? "Update Permission" : "Create Permission"}
        </button>
      </div>
    </form>
  );
}
