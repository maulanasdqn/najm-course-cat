import { Control, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/commons/constants/routes";
import { createTestFormSchema, CreateTestFormData } from "../_schemas/test-form.schema";
import { useCreateTest } from "../_hooks/use-create-test";
import { useUpdateTest } from "../_hooks/use-update-test";
import { TTestDetailResponse } from "@/api/test/type";
import { InputText } from "@/app/_components/ui/inputs/text";
import { InputCheckbox } from "@/app/_components/ui/inputs/checkbox";
import { FileUpload } from "@/app/_components/ui/inputs/file-upload";
import { TrashIcon } from "@/app/_components/ui/icons/ic-trash";
import { Button } from "../../_components/button";

type TestFormProps = {
  type: "create" | "update";
  defaultValues?: TTestDetailResponse["data"];
};

export const TestForm = ({ type, defaultValues }: TestFormProps) => {
  const navigate = useNavigate();
  const { mutate: createTest } = useCreateTest();
  const { mutate: updateTest } = useUpdateTest(defaultValues?.id ?? "");

  const { control, handleSubmit } = useForm<CreateTestFormData>({
    resolver: zodResolver(createTestFormSchema),
    defaultValues: defaultValues
      ? {
          session_id: defaultValues.id,
          test_name: defaultValues.test_name,
          questions: defaultValues.questions,
        }
      : undefined,
  });

  const { fields, append, remove } = useFieldArray({
    name: "questions",
    control,
  });

  const onSubmit = (data: CreateTestFormData) => {
    if (type === "create") {
      createTest(data, {
        onSuccess: () => {
          navigate(ROUTES.ADMIN.TESTS.LIST.URL);
        },
      });
    } else {
      updateTest(data, {
        onSuccess: () => {
          navigate(ROUTES.ADMIN.TESTS.LIST.URL);
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <InputText
          name="test_name"
          control={control}
          label="Nama Ujian"
          placeholder="Masukan Nama Ujian"
        />
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">Daftar Pertanyaan</h3>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {fields.map((field, fieldIndex) => (
            <div key={field.id} className="rounded-lg border border-gray-200 p-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Question index={fieldIndex} control={control} />
                </div>
                <button
                  type="button"
                  onClick={() => remove(fieldIndex)}
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                >
                  <TrashIcon />
                </button>
              </div>
            </div>
          ))}
          
          <div
            className="flex flex-col items-center justify-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300 cursor-pointer hover:bg-gray-100 hover:shadow-md transition-all"
            onClick={() =>
              append({
                question: "",
                options: [],
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
            <p className="text-sm text-gray-500 font-medium">Klik disini untuk menambahkan pertanyaan</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          variant="secondary"
          type="button"
          onClick={() => navigate(ROUTES.ADMIN.TESTS.LIST.URL)}
        >
          Cancel
        </Button>
        <Button type="submit">{type === "create" ? "Create" : "Update"} Test</Button>
      </div>
    </form>
  );
};

const Question = ({ index, control }: { index: number; control: Control<CreateTestFormData> }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${index}.options`,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="font-medium">Pertanyaan {index + 1}</span>
      </div>
      <InputText
        name={`questions.${index}.question`}
        control={control}
        label="Pertanyaan"
        placeholder="Masukan Pertanyaan"
      />

      <InputText
        name={`questions.${index}.discussion`}
        control={control}
        label="Pembahasan"
        placeholder="Masukan Pembahasan"
      />
      <div className="mt-4">
        <FileUpload
          label="Question Image"
          control={control}
          name={`questions.${index}.image_url`}
          defaultFile={control._formValues.questions[index]?.image_url}
        />
      </div>

      <div className="pl-4 border-l-2 border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="font-medium">Opsi Jawaban</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {fields.map((field, fieldIndex) => (
            <div
              key={field.id}
              className="flex items-start gap-4 p-3 rounded-lg border border-gray-100"
            >
              <div className="flex-1">
                <InputText
                  name={`questions.${index}.options.${fieldIndex}.label`}
                  control={control}
                  label="Pilih Opsi"
                  placeholder="Masukan Opsi"
                />
                <div className="mt-2">
                  <FileUpload
                    control={control}
                    name={`questions.${index}.options.${fieldIndex}.image_url`}
                    label="Option Image"
                    defaultFile={
                      control._formValues.questions[index]?.options[fieldIndex]?.image_url
                    }
                  />
                </div>
                <div className="mt-2">
                  <InputCheckbox
                    name={`questions.${index}.options.${fieldIndex}.is_correct`}
                    control={control}
                    label="Jawaban Benar"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => remove(fieldIndex)}
                className="h-8 w-8 flex items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-200"
              >
                <TrashIcon />
              </button>
            </div>
          ))}
          
          <div
            className="flex flex-col items-center justify-center py-4 bg-gray-50 rounded-lg border border-dashed border-gray-300 cursor-pointer hover:bg-gray-100 hover:shadow-md transition-all"
            onClick={() =>
              append({
                label: "",
                is_correct: false,
              })
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-400 mb-2"
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
            <p className="text-xs text-gray-500 font-medium">Tambah Opsi</p>
          </div>
        </div>
      </div>
    </div>
  );
};
