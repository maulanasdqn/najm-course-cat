import { useParams } from "react-router-dom";
import { TestForm } from "../../components/test-form";
import { useGetTest } from "../../_hooks/use-get-test";

export default function UpdateTestPage() {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetTest(id ?? "");

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit User</h1>
      </div>
      <div className="max-w-2xl rounded-lg border bg-white p-6">
        <TestForm key={data?.data.id} type="update" defaultValues={data?.data} />
      </div>
    </div>
  );
}
