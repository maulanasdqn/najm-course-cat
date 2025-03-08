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
        <SessionTestForm
          key={data?.data.id}
          type="update"
          defaultValues={{
            id: data?.data.id,
            session_name: data?.data?.session_name,
            description: data?.data?.description,
            student_type: data?.data?.student_type,
            is_active: data?.data.is_active,
            tests: data?.data.tests,
          }}
        />
      </div>
    </div>
  );
}
