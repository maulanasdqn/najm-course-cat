import { answerExam } from "@/api/exams";
import { TExamAnswerRequest } from "@/api/exams/type";
import { useMutation } from "@tanstack/react-query";

export const useAnswerExamMutation = (id: string) => {
  return useMutation({
    mutationKey: ["answer-exam", id],
    mutationFn: (payload: TExamAnswerRequest) => answerExam(id, payload),
  });
};
