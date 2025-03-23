import { answerExam } from "@/api/test";
import { TExamAnswerRequest } from "@/api/test/type";
import { useMutation } from "@tanstack/react-query";

export const useAnswerExamMutation = () => {
  return useMutation({
    mutationKey: ["answer-exam"],
    mutationFn: (payload: TExamAnswerRequest) => answerExam(payload),
  });
};