import { useParams } from "react-router-dom";
import { useGetSessionTest } from "../../_hooks/use-get-session-test";

export default function SessionTestDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetSessionTest(id ?? "");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data?.data) {
    return <div>Session test not found</div>;
  }

  const sessionTest = data.data;

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Session Test Details</h1>
      <div className="max-w-2xl rounded-lg border bg-white p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-sm font-medium text-gray-500">Name</h2>
            <p className="mt-1">{sessionTest.session_name}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500">Deskripsi</h2>
            <p className="mt-1">{sessionTest.description}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500">Kategori</h2>
            <p className="mt-1">{sessionTest.student_type}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500">Created At</h2>
            <p className="mt-1">{new Date(sessionTest.created_at).toLocaleString()}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500">Updated At</h2>
            <p className="mt-1">{new Date(sessionTest.updated_at).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
