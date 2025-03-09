import { useParams } from "react-router-dom";
import { useGetTest } from "../../_hooks/use-get-test";

export default function TestDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetTest(id ?? "");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data?.data) {
    return <div>Test not found</div>;
  }

  const test = data.data;

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Test Details</h1>
      <div className="max-w-4xl rounded-lg border bg-white p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h2 className="text-sm font-medium text-gray-500">Name</h2>
              <p className="mt-1 font-medium">{test.test_name}</p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500">Session ID</h2>
              <p className="mt-1">{test.session_id}</p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500">Created At</h2>
              <p className="mt-1">{new Date(test.created_at).toLocaleString()}</p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500">Updated At</h2>
              <p className="mt-1">{new Date(test.updated_at).toLocaleString()}</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="mb-4 text-xl font-semibold">Questions</h2>
            <div className="space-y-8">
              {test.questions.map((question, index) => (
                <div key={question.id} className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-medium">
                      <span className="mr-2 rounded-full bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800">
                        {index + 1}
                      </span>
                      {question.question}
                      {question.image_url && (
                        <img
                          src={question.image_url}
                          alt="Question"
                          className="mt-4 max-w-full h-48 object-contain"
                        />
                      )}
                    </h3>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                    {question.options.map((option) => (
                      <div
                        key={option.id}
                        className={`flex items-start rounded-md border p-3 ${
                          option.is_correct
                            ? "border-green-300 bg-green-50"
                            : "border-gray-200 bg-white"
                        }`}
                      >
                        <div className="flex-1">
                          <div className="flex items-center">
                            <span className="mr-2 text-sm">{option.label}</span>
                            {option.image_url && (
                              <img
                                src={option.image_url}
                                alt="Option"
                                className="mt-2 max-w-full h-32 object-contain"
                              />
                            )}
                            {option.is_correct && (
                              <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                Correct Answer
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {question.discussion && (
                    <div className="mt-4 rounded-md border border-blue-200 bg-blue-50 p-3">
                      <h4 className="font-medium text-blue-800">Discussion:</h4>
                      <p className="mt-1 text-sm text-gray-700">{question.discussion}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
