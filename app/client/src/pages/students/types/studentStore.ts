import type { Loading } from "@/shared/types";
import type { PreloadStudentAnswer } from "./data";

export type StudentStore = {
  loading: Loading;
  data: null | PreloadStudentAnswer[];
  getStudents: (testId: number) => Promise<void>;
  getFilteredData: (searchValue: string) => PreloadStudentAnswer[];
  resetStore: () => void;
};
