import type { Courses, Loading } from "@/shared/types";

export type CoursesStore = {
  loading: Loading;
  data: null | Courses[];
  getCourses: (className: string, userId: number) => Promise<void>;
  getAllCourses: () => Promise<void>;
  getFilteredData: (searchValue: string) => Courses[];
  setCoursePassed: (courseId: number) => void;
};
