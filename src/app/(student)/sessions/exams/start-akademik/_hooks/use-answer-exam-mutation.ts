import { answerExam } from "@/api/answer";
import { TExamAnswerRequest } from "@/api/answer/type";
import { useMutation } from "@tanstack/react-query";

export const useAnswerExamMutation = () => {
  return useMutation({
    mutationKey: ["answer-exam"],
    mutationFn: (payload: TExamAnswerRequest) => answerExam(payload),
  });
};
