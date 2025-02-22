import { useParams } from "react-router-dom";
import { SessionTestForm } from "../../components/session-test-form";
import { useGetSessionTest } from "../../_hooks/use-get-session-test";

export default function UpdateSessionTestPage() {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetSessionTest(id ?? "");

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit User</h1>
      </div>
      <div className="max-w-2xl rounded-lg border bg-white p-6">
        <SessionTestForm type="update" defaultValues={data?.data} />
      </div>
    </div>
  );
}
