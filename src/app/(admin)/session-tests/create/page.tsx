import { SessionTestForm } from "../components/session-test-form";

export default function CreateSessionTestPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create Session Test</h1>
      </div>
      <div className="max-w-2xl rounded-lg border bg-white p-6">
        <SessionTestForm type="create" />
      </div>
    </div>
  );
}
