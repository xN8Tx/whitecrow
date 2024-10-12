import type { Loading } from "@/shared/types";
import type { AnswerForm, FullCourse } from "./data";

export type CourseStore = {
  loading: Loading;
  data: null | FullCourse;
  getCourse: (id: number) => Promise<void>;
  sendAnswer: (form: AnswerForm) => Promise<false | number>;
  resetStore: () => void;
};
