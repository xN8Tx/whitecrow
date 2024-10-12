import { $axios } from "@/shared/api";
import type { StudentStore } from "../types";
import { create } from "zustand";

export const useStudentStore = create<StudentStore>((set, get) => ({
  loading: "idle",
  data: null,
  getStudents: async (testId) => {
    try {
      const { loading } = get();
      if (loading !== "idle" && loading !== "error") return;

      set(() => ({ loading: "loading" }));

      const response = await $axios.get(`/student-answer-test/${testId}`);
      const data = response.data.data;

      set(() => ({ loading: "success", data }));
    } catch (error) {
      set(() => ({ loading: "error" }));
      console.log(error);
    }
  },
  getFilteredData: (searchValue) => {
    const data = get().data;

    if (!data) return [];
    if (searchValue === "") return data;

    return data.filter((student) =>
      student.user.name.toLowerCase().includes(searchValue.toLowerCase()),
    );
  },
  resetStore: () => {
    set(() => ({ loading: "idle", data: null }));
  },
}));

export default useStudentStore;
