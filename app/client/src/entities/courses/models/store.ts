import type { CoursesStore } from "../types";
import type { Courses } from "@/shared/types";

import { create } from "zustand";
import { $axios } from "@/shared/api";

export const useCoursesStore = create<CoursesStore>((set, get) => ({
  loading: "idle",
  data: null,
  getFilteredData: (searchValue) => {
    const data = get().data;

    if (!data) return [];
    if (searchValue === "") return data;

    const filteredData = data.filter((course) => {
      if (
        course.title.toLowerCase()?.includes(searchValue.toLowerCase()) ||
        course.subject.toLowerCase()?.includes(searchValue.toLowerCase()) ||
        course.classes?.includes(searchValue)
      )
        return course;
    });
    return filteredData;
  },
  getCourses: async (className, userId) => {
    try {
      const { loading } = get();
      if (loading !== "idle" && loading !== "error") return;

      set(() => ({ loading: "loading" }));

      const coursesResponse = await $axios.get(`/test/${className}`);
      const courses = coursesResponse.data.data;

      const studentAnswerResponse = await $axios.get(
        `/student-answer/${userId}`,
      );
      const studentAnswer = studentAnswerResponse.data.data;

      const data = (courses as Courses[]).map((i) => {
        if (studentAnswer.includes(i.id)) {
          i.isPassed = true;
          return i;
        }
        i.isPassed = false;
        return i;
      });

      set(() => ({ loading: "success", data: data }));
    } catch (error) {
      console.log(error);
      set(() => ({ loading: "error" }));
    }
  },
  // Получение всех курсов
  getAllCourses: async () => {
    try {
      const { loading } = get();
      if (loading !== "idle" && loading !== "error") return;

      set(() => ({ loading: "loading" }));

      const response = await $axios.get(`/tests`);
      const data = response.data.data;

      set(() => ({ loading: "success", data: data }));
    } catch (error) {
      console.log(error);
      set(() => ({ loading: "error" }));
    }
  },
  // Установка статуса "пройдено" для курса
  setCoursePassed: (courseId) => {
    const data = get().data;

    const newData = data?.map((d) => {
      if (d.id !== courseId) return d;
      d.isPassed = true;
      return d;
    });

    set(() => ({ data: newData }));
  },
}));
