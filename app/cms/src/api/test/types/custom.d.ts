export type Subject = {
  id: number;
  name: string;
};

export type Classes = {
  id: number;
  name: string;
};

export type Question = {
  id?: number;
  title: string;
  media: number;
  answers: AnswerWithCorrect[];
};

export type CreateCourse = {
  title: string;
  className: Classes;
  subject: Subject;
  thumbnail: number;
  question: Question[];
};
