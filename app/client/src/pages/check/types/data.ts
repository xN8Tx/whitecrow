import type { Question, ShortUser, Subject } from "@/shared/types";

export type StudentAnswer = {
  [x: string]: string;
};

export type CourseWithStudentAnswer = {
  testId: number;
  answerId: number;
  title: string;
  question: Question[];
  answers: StudentAnswer;
  user: ShortUser;
  teacherReview: string;
  psychologistReview: string;
  subject: Subject;
};
