import { TTestAnswerDetailResponse } from "@/api/test/type";

export const dummyTestAnswerData: TTestAnswerDetailResponse = {
  status_code: 200,
  data: {
    id: "dummy-test-id",
    test_id: "dummy-test-id",
    user_id: "dummy-user-id",
    created_at: "2023-10-01T12:00:00Z",
    updated_at: "2023-10-01T12:00:00Z",
    questions: [
      {
        id: "question-1",
        question: "Menyelesaikan tugas dengan seadanya lebih baik daripada tidak disiplin.",
        discussion: "Ini adalah penjelasan untuk pertanyaan pertama.",
        options: [
          {
            id: "option-1",
            label: "Sangat Setuju",
            is_correct: true,
            is_selected: true,
          },
          {
            id: "option-2",
            label: "Setuju",
            is_correct: false,
            is_selected: false,
          },
          {
            id: "option-3",
            label: "Tidak Setuju",
            is_correct: false,
            is_selected: false,
          },
          {
            id: "option-4",
            label: "Sangat Tidak Setuju",
            is_correct: false,
            is_selected: false,
          },
        ],
      },
      {
        id: "question-2",
        question: "Saya lebih baik mengerjakan tugas yang baru daripada tugas yang rutin dan membosankan.",
        discussion: "Ini adalah penjelasan untuk pertanyaan kedua.",
        options: [
          {
            id: "option-1",
            label: "Sangat Setuju",
            is_correct: false,
            is_selected: true,
          },
          {
            id: "option-2",
            label: "Setuju",
            is_correct: true,
            is_selected: false,
          },
          {
            id: "option-3",
            label: "Tidak Setuju",
            is_correct: false,
            is_selected: false,
          },
          {
            id: "option-4",
            label: "Sangat Tidak Setuju",
            is_correct: false,
            is_selected: false,
          },
        ],
      },
      {
        id: "question-3",
        question: "Melupakan kemarahan lebih baik daripada selalu berkata buruk di depannya.",
        discussion: "Ini adalah penjelasan untuk pertanyaan ketiga.",
        options: [
          {
            id: "option-1",
            label: "Sangat Setuju",
            is_correct: true,
            is_selected: false,
          },
          {
            id: "option-2",
            label: "Setuju",
            is_correct: false,
            is_selected: true,
          },
          {
            id: "option-3",
            label: "Tidak Setuju",
            is_correct: false,
            is_selected: false,
          },
          {
            id: "option-4",
            label: "Sangat Tidak Setuju",
            is_correct: false,
            is_selected: false,
          },
        ],
      },
    ],
  },
  version: "1.0.0",
};
