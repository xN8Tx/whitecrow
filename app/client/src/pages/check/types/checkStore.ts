import type { Loading } from "@/shared/types";
import { CourseWithStudentAnswer } from "./data";

export type CheckStore = {
  loading: Loading;
  data: null | CourseWithStudentAnswer;
  getData: (answerId: number) => Promise<void>;
  resetStore: () => void;
  uploadReview: (review: string) => Promise<boolean>;
};
