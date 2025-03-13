import { Control, FieldErrors, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/commons/constants/routes";
import {
  createSessionTestFormSchema,
  CreateSessionTestFormData,
} from "../../_schemas/session-test-form.schema";
import { useCreateSessionTest } from "../../_hooks/use-create-session-test";
import { useUpdateSessionTest } from "../../_hooks/use-update-session-test";
import { TSessionTestItem } from "@/api/session-test/type";
import { InputText } from "@/app/_components/ui/inputs/text";
import { studentTypeOptions } from "@/commons/constants/student-type";
import { Select } from "@/app/_components/ui/inputs/select";
import { InputTextArea } from "@/app/_components/ui/inputs/text-area";
import { categoryOptions } from "./constants";
import { InputCheckbox } from "@/app/_components/ui/inputs/checkbox";
import { useGetTestsOption } from "./use-get-tests-option";
import { Button } from "../../../_components/button";
import { format } from "date-fns";
import { TZDate } from "@date-fns/tz";
import LoadingOverlay from "@/app/_components/ui/loading-overlay";

type SessionTestFormProps = {
  type: "create" | "update";
  defaultValues?: Partial<TSessionTestItem>;
};

export const SessionTestForm = ({ type, defaultValues }: SessionTestFormProps) => {
  const navigate = useNavigate();
  const { mutate: createSessionTest, isPending: isCreating } = useCreateSessionTest();
  const { mutate: updateSessionTest, isPending: isUpdating } = useUpdateSessionTest(
    defaultValues?.id ?? "",
  );
  const isLoading = isCreating || isUpdating;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateSessionTestFormData>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(createSessionTestFormSchema),
    defaultValues: defaultValues
      ? {
          session_name: defaultValues.session_name,
          student_type: defaultValues.student_type,
          description: defaultValues.description,
          is_active: defaultValues.is_active,
          tests: defaultValues.tests?.map((test) => ({
            ...test,
            weight: test.weight,
            multiplier: test.multiplier,
          })),
        }
      : undefined,
  });

  const onSubmit = (data: CreateSessionTestFormData) => {
    const payload = {
      ...data,
      tests: data.tests?.map((test) => {
        return {
          ...test,
          start_date: format(new TZDate(test.start_date, "UTC"), "yyyy-MM-dd'T'HH:mm"),
          end_date: format(new TZDate(test.end_date, "UTC"), "yyyy-MM-dd'T'HH:mm"),
        };
      }),
    };
    if (type === "create") {
      createSessionTest(payload, {
        onSuccess: () => {},
      });
    } else {
      updateSessionTest(payload, {
        onSuccess: () => {},
      });
    }
  };

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "tests",
    keyName: "id",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit, (a) => console.log(a))} className="space-y-6 relative">
      {isLoading && (
        <LoadingOverlay
          message={type === "create" ? "Creating session test..." : "Updating session test..."}
        />
      )}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Session Information</h2>
        <div className="space-y-4">
          <InputText
            name="session_name"
            control={control}
            label="Nama"
            placeholder="Masukan nama sesi"
          />

          <div>
            <InputCheckbox name="is_active" control={control} label="Aktif" />
            <div className="text-sm mt-1 text-gray-500">
              Jika sesi tidak aktif maka tidak akan muncul di halaman murid
            </div>
          </div>

          <InputTextArea
            name="description"
            control={control}
            label="Deskripsi"
            placeholder="Masukan deskripsi"
          />

          <Select
            name="student_type"
            control={control}
            label="Jenis Siswa"
            placeholder="Pilih Jenis Siswa"
            options={studentTypeOptions}
          />

          <Select
            name="category"
            control={control}
            label="Kategori"
            placeholder="Pilih Kategori"
            options={categoryOptions}
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold">Tests</h2>
          </div>
        </div>

        {/* Display form-level errors */}
        {(errors.tests?.message || errors.tests?.root?.message) && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600">
            {errors.tests?.message || errors.tests?.root?.message}
          </div>
        )}

        {
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((field, index) => (
              <TestCard
                key={field.id}
                control={control}
                index={index}
                onRemove={() => remove(index)}
                errors={errors}
              />
            ))}
            <div
              className="flex flex-col items-center justify-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300 cursor-pointer hover:bg-gray-100 hover:shadow-md transition-all h-[284px]"
              onClick={() =>
                append({
                  end_date: "",
                  multiplier: "",
                  start_date: "",
                  test_id: "",
                  weight: "",
                })
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-gray-400 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <p className="text-sm text-gray-500 font-medium">
                Klik disini untuk menambahkan test
              </p>
            </div>
          </div>
        }
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => navigate(ROUTES.ADMIN.SESSION_TESTS.LIST.URL)}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          {type === "create" ? "Create" : "Update"} Session Test
        </button>
      </div>
    </form>
  );
};

const TestCard = ({
  control,
  index,
  onRemove,
  errors,
}: {
  control: Control<CreateSessionTestFormData>;
  index: number;
  onRemove: () => void;
  errors?: FieldErrors<CreateSessionTestFormData>;
}) => {
  const { data } = useGetTestsOption({});

  // Helper function to check if there are any errors for this test
  const hasErrors = errors ? "tests" in errors : false;

  return (
    <div
      className={`bg-white rounded-lg border ${hasErrors ? "border-red-300" : "border-gray-200"} shadow-sm overflow-hidden`}
    >
      <div
        className={`${hasErrors ? "bg-red-50" : "bg-gray-50"} px-4 py-3 border-b ${hasErrors ? "border-red-300" : "border-gray-200"} flex justify-between items-center`}
      >
        <h3 className={`font-medium ${hasErrors ? "text-red-700" : "text-gray-700"}`}>
          Test #{index + 1}
          {hasErrors && <span className="ml-2 text-xs text-red-600">(has errors)</span>}
        </h3>
        <Button
          type="button"
          onClick={onRemove}
          variant="secondary"
          className="!py-1 !px-2 text-sm flex items-center text-red-600 hover:text-red-700 bg-white border border-gray-300 hover:bg-gray-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          Remove
        </Button>
      </div>

      <div className="p-4 space-y-4">
        <Select
          label="Test"
          name={`tests.${index}.test_id`}
          options={[{ label: "Pilih test", value: "" }, ...(data || [])]}
          control={control}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputText
            name={`tests.${index}.weight`}
            type="number"
            control={control}
            label="Bobot(%)"
            placeholder="Masukan bobot"
            rules={{ deps: ["tests"] }}
          />
          <InputText
            name={`tests.${index}.multiplier`}
            type="number"
            control={control}
            label="Pengali"
            placeholder="Masukan pengali"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputText
            name={`tests.${index}.start_date`}
            type="datetime-local"
            control={control}
            label="Tanggal Mulai"
            placeholder="Masukan tanggal mulai"
            rules={{ deps: ["tests"] }}
          />
          <InputText
            name={`tests.${index}.end_date`}
            type="datetime-local"
            control={control}
            label="Tanggal Akhir"
            placeholder="Masukan tanggal akhir"
            rules={{ deps: ["tests"] }}
          />
        </div>
      </div>
    </div>
  );
};
