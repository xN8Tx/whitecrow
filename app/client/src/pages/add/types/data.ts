import type { AnswerWithCorrect, Classes, Subject } from "@/shared/types";

type CreateQuestion = {
  title: string;
  answers: AnswerWithCorrect[];
  media: number | null;
  id?: number;
};

export type CreateCourse = {
  title: string;
  className: Classes;
  subject: Subject;
  thumbnail: number | null;
  question: CreateQuestion[];
};
