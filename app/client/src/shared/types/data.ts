export type Subject = {
  id: number;
  name: string;
};

export type Classes = {
  id: number;
  name: string;
};

export type Role = {
  id: number;
  name: "Teacher" | "Psychologist" | "Student";
  description: string;
};

export type AnswerWithCorrect = {
  text: string;
  isCorrect: boolean;
};

export type Media = {
  url: string;
  type: string;
};

export type ShortUser = {
  id: number;
  name: string;
  className: string;
};

export type Question = {
  id: number;
  title: string;
  media: Media;
  answers: AnswerWithCorrect[];
};

export type Courses = {
  id: number;
  title: string;
  thumbnail: string;
  subject: string;
  classes: string[] | string;
  isPassed?: boolean;
};

export type Student = {
  id: number;
  name: string;
  classes: Classes[];
  role: Role;
};
