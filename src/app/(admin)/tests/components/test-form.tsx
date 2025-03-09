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

  const { control, handleSubmit, setValue } = useForm<CreateTestFormData>({
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
    keyName: "index",
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
          label="Pertanyaan"
          placeholder="Masukan Pertanyaan"
        />
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">Daftar Pertanyaan</h3>
          <Button
            type="button"
            onClick={() =>
              append({
                question: "",
                options: [],
              })
            }
          >
            Tambah Pertanyaan
          </Button>
        </div>

        {fields.map((field, fieldIndex) => (
          <div key={field.index} className="rounded-lg border border-gray-200 p-4">
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
    keyName: "index",
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
          <Button
            type="button"
            onClick={() =>
              append({
                label: "",
                is_correct: false,
              })
            }
            className="bg-success hover:bg-success-dark text-white flex items-center gap-2"
          >
            Tambah Opsi
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {fields.map((field, fieldIndex) => (
            <div
              key={field.index}
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
                onClick={() => remove(field.index)}
                className="h-8 w-8 flex items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-200"
              >
                <TrashIcon />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
