import { getExam } from "@/api/exams";
import { useQuery } from "@tanstack/react-query";

export const useExamQuery = (id: string) => {
  return useQuery({
    queryKey: ["exams", id],
    queryFn: () => getExam(id),
  });
};
