import { useState } from "react";
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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/_components/ui/dialog";
import { PlusIcon } from "@/app/_components/ui/icons/ic-plus";
import { EditIcon } from "@/app/_components/ui/icons/ic-edit";

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
          label="Nama Ujian"
          placeholder="Masukan Nama Ujian"
          error={errors.test_name?.message}
        />
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">Daftar Pertanyaan</h3>
          <Button
            type="button"
            onClick={handleAddQuestion}
            className="flex items-center gap-2"
          >
            <PlusIcon className="w-4 h-4" />
            Tambah Pertanyaan
          </Button>
        </div>

        {fields.length === 0 ? (
          <div className="text-center py-8 border border-dashed rounded-lg">
            <p className="text-gray-500">Belum ada pertanyaan. Klik tombol "Tambah Pertanyaan" untuk menambahkan.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {fields.map((field, fieldIndex) => (
              <div key={field.index} className="rounded-lg border border-gray-200 p-4 hover:border-gray-300 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-lg">Pertanyaan {fieldIndex + 1}</span>
                    </div>
                    <p className="mb-2 font-medium">{field.question || "No question text"}</p>
                    
                    {field.image_url && (
                      <div className="mb-2">
                        <img src={field.image_url} alt="Question" className="h-20 object-contain rounded" />
                      </div>
                    )}
                    
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {field.options?.length || 0} opsi • 
                        {field.options?.filter(opt => opt.is_correct).length || 0} jawaban benar
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleEditQuestion(fieldIndex)}
                      className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
                    >
                      <EditIcon className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(fieldIndex)}
                      className="h-10 w-10 flex items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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

      {/* Question Modal */}
      <QuestionModal 
        isOpen={isQuestionModalOpen}
        onClose={() => setIsQuestionModalOpen(false)}
        control={control}
        questionIndex={currentQuestionIndex}
        onSave={(questionData) => {
          if (currentQuestionIndex !== null) {
            // Update existing question
            update(currentQuestionIndex, questionData);
          } else {
            // Add new question
            append(questionData);
          }
          setIsQuestionModalOpen(false);
        }}
      />
    </form>
  );
};

type QuestionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  control: Control<CreateTestFormData>;
  questionIndex: number | null;
  onSave: (questionData: any) => void;
};

const QuestionModal = ({ isOpen, onClose, control, questionIndex, onSave }: QuestionModalProps) => {
  const isEditing = questionIndex !== null;
  const [localQuestion, setLocalQuestion] = useState<any>({
    question: "",
    discussion: "",
    image_url: "",
    options: [],
  });

  // Initialize form with existing question data when editing
  useEffect(() => {
    if (isEditing && control._formValues.questions[questionIndex]) {
      setLocalQuestion({
        ...control._formValues.questions[questionIndex]
      });
    } else {
      setLocalQuestion({
        question: "",
        discussion: "",
        image_url: "",
        options: [],
      });
    }
  }, [isOpen, questionIndex, control._formValues.questions]);

  const { fields, append, remove, update } = useFieldArray({
    control: useForm({
      defaultValues: {
        options: localQuestion.options || []
      }
    }).control,
    name: "options",
  });

  const handleAddOption = () => {
    const newOptions = [...localQuestion.options || [], {
      label: "",
      is_correct: false,
      image_url: ""
    }];
    setLocalQuestion({...localQuestion, options: newOptions});
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = [...localQuestion.options];
    newOptions.splice(index, 1);
    setLocalQuestion({...localQuestion, options: newOptions});
  };

  const handleOptionChange = (index: number, field: string, value: any) => {
    const newOptions = [...localQuestion.options];
    newOptions[index] = {...newOptions[index], [field]: value};
    setLocalQuestion({...localQuestion, options: newOptions});
  };

  const handleQuestionChange = (field: string, value: any) => {
    setLocalQuestion({...localQuestion, [field]: value});
  };

  const handleSave = () => {
    onSave(localQuestion);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Pertanyaan' : 'Tambah Pertanyaan Baru'}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="font-medium">Pertanyaan</label>
              <textarea 
                className="w-full p-2 border rounded-md"
                placeholder="Masukan Pertanyaan"
                value={localQuestion.question}
                onChange={(e) => handleQuestionChange('question', e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <label className="font-medium">Pembahasan</label>
              <textarea
                className="w-full p-2 border rounded-md"
                placeholder="Masukan Pembahasan"
                value={localQuestion.discussion}
                onChange={(e) => handleQuestionChange('discussion', e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <label className="font-medium">Gambar Pertanyaan</label>
              <input 
                type="file"
                className="w-full p-2 border rounded-md"
                onChange={(e) => {
                  // Handle file upload logic here
                  // For now, just update the URL with a placeholder
                  if (e.target.files?.[0]) {
                    handleQuestionChange('image_url', URL.createObjectURL(e.target.files[0]));
                  }
                }}
              />
              {localQuestion.image_url && (
                <div className="mt-2">
                  <img 
                    src={localQuestion.image_url} 
                    alt="Question preview" 
                    className="h-40 object-contain"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Opsi Jawaban</h3>
              <Button
                type="button"
                onClick={handleAddOption}
                className="bg-success hover:bg-success-dark text-white flex items-center gap-2"
              >
                <PlusIcon className="w-4 h-4" />
                Tambah Opsi
              </Button>
            </div>

            {localQuestion.options?.length === 0 ? (
              <div className="text-center py-4 border border-dashed rounded-lg">
                <p className="text-gray-500">Belum ada opsi jawaban. Klik tombol "Tambah Opsi" untuk menambahkan.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {localQuestion.options?.map((option: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-3 rounded-lg border border-gray-200"
                  >
                    <div className="flex-1">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Pilihan {index + 1}</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded-md"
                          placeholder="Masukan Opsi"
                          value={option.label}
                          onChange={(e) => handleOptionChange(index, 'label', e.target.value)}
                        />
                      </div>
                      
                      <div className="mt-2 space-y-2">
                        <label className="text-sm font-medium">Gambar Opsi</label>
                        <input 
                          type="file"
                          className="w-full p-2 border rounded-md"
                          onChange={(e) => {
                            // Handle file upload logic here
                            if (e.target.files?.[0]) {
                              handleOptionChange(index, 'image_url', URL.createObjectURL(e.target.files[0]));
                            }
                          }}
                        />
                        {option.image_url && (
                          <div className="mt-1">
                            <img 
                              src={option.image_url} 
                              alt="Option preview" 
                              className="h-20 object-contain"
                            />
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-2 flex items-center">
                        <input
                          type="checkbox"
                          id={`option-correct-${index}`}
                          checked={option.is_correct}
                          onChange={(e) => handleOptionChange(index, 'is_correct', e.target.checked)}
                          className="mr-2"
                        />
                        <label htmlFor={`option-correct-${index}`} className="text-sm font-medium">
                          Jawaban Benar
                        </label>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(index)}
                      className="h-8 w-8 flex items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="secondary" type="button" onClick={onClose}>
            Batal
          </Button>
          <Button type="button" onClick={handleSave}>
            {isEditing ? 'Perbarui' : 'Tambah'} Pertanyaan
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Add missing imports
import { useEffect } from "react";
