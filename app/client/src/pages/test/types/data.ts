import type { Courses, Question } from "@/shared/types";

export type AnswerForm = {
  userId: number;
  testId: number;
  answers: {
    [x: string]: string;
  };
};

export type FullCourse = Courses & {
  question: Question[];
};
