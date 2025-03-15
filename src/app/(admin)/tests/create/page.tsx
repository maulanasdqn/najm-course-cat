import { TestForm } from "../_components/test-form";

export default function CreateTestPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create Test</h1>
      </div>
      <div className="max-w-2xl rounded-lg border bg-white p-6">
        <TestForm type="create" />
      </div>
    </div>
  );
}
