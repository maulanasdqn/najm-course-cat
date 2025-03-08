import { useForm } from "react-hook-form";
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

type SessionTestFormProps = {
  type: "create" | "update";
  defaultValues?: Partial<TSessionTestItem>;
};

export const SessionTestForm = ({ type, defaultValues }: SessionTestFormProps) => {
  const navigate = useNavigate();
  const { mutate: createSessionTest } = useCreateSessionTest();
  const { mutate: updateSessionTest } = useUpdateSessionTest(defaultValues?.id ?? "");

  const { control, handleSubmit } = useForm<CreateSessionTestFormData>({
    resolver: zodResolver(createSessionTestFormSchema),
    defaultValues: defaultValues
      ? {
          session_name: defaultValues.session_name,
          student_type: defaultValues.student_type,
          description: defaultValues.description,
        }
      : undefined,
  });

  const onSubmit = (data: CreateSessionTestFormData) => {
    if (type === "create") {
      createSessionTest(data, {
        onSuccess: () => {
          navigate(ROUTES.ADMIN.SESSION_TESTS.LIST.URL);
        },
      });
    } else {
      updateSessionTest(data, {
        onSuccess: () => {
          navigate(ROUTES.ADMIN.SESSION_TESTS.LIST.URL);
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <InputText
        name="session_name"
        control={control}
        label="Nama"
        placeholder="Masukan Nama Lengkap"
      />

      <InputTextArea
        name="description"
        control={control}
        label="Deskripsi"
        placeholder="Masukan Deskripsi"
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
