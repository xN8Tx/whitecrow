import type { CourseStore } from "../types";

import { create } from "zustand";
import { $axios } from "@/shared/api";

export const useCourseStore = create<CourseStore>((set, get) => ({
  loading: "idle",
  data: null,
  getCourse: async (id: number) => {
    try {
      const { loading } = get();
      if (loading !== "idle" && loading !== "error") return;

      set(() => ({ loading: "loading" }));

      const response = await $axios.get(`tests/${id}`);
      const data = response.data.data;

      set(() => ({ loading: "success", data: data }));
    } catch (error) {
      set(() => ({ loading: "error" }));
    }
  },
  resetStore: () => {
    set(() => ({ loading: "idle", data: null }));
  },
  sendAnswer: async (form) => {
    try {
      const body = {
        user: form.userId,
        test: form.testId,
        answers: form.answers,
      };

      await $axios.post(`/student-answers`, { data: body });

      return form.testId;
    } catch (error) {
      return false;
    }
  },
}));
