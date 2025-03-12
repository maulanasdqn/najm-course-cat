import { useParams } from "react-router-dom";
import { TestForm } from "../_components/test-form";
import { useGetTest } from "../_hooks/use-get-test";
import { useUpdateTest } from "../_hooks/use-update-test";

export default function UpdateTestPage() {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetTest(id ?? "");
  const { isLoading } = useUpdateTest(id ?? "");

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit Test</h1>
      </div>
      <div className="max-w-2xl rounded-lg border bg-white p-6">
        <TestForm key={data?.data.id} type="update" defaultValues={data?.data} isLoading={isLoading} />
      </div>
    </div>
  );
}
