import { useParams } from "react-router-dom";
import { SessionTestForm } from "../../components/session-test-form";
import { useGetSessionTest } from "../../_hooks/use-get-session-test";
import { convertDateToDatetimeLocal } from "@/utils/date";

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
            student_type: data?.data?.student_type,
            start_date: data?.data?.start_date
              ? convertDateToDatetimeLocal(new Date(data?.data?.start_date))
              : undefined,
            end_date: data?.data?.end_date
              ? convertDateToDatetimeLocal(new Date(data?.data?.end_date))
              : undefined,
          }}
        />
      </div>
    </div>
  );
}
