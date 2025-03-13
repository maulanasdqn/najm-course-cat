import { TestForm } from "../_components/test-form";
import { useCreateTest } from "../_hooks/use-create-test";

export default function CreateTestPage() {
  const { isLoading } = useCreateTest();

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create Test</h1>
      </div>
      <div className="max-w-2xl rounded-lg border bg-white p-6">
        <TestForm type="create" isLoading={isLoading} />
      </div>
    </div>
  );
}
