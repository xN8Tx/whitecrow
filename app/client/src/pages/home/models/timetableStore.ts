import type { TimetableStore } from "../types";

import { create } from "zustand";
import { $axios } from "@/shared/api";

export const useTimetableStore = create<TimetableStore>((set) => ({
  loading: "idle",
  data: null,
  getTimetable: async (className) => {
    try {
      set(() => ({ loading: "loading" }));
      const response = await $axios.get(`/timetable/${className}`);
      const data = response.data.message;
      set(() => ({ data }));

      set(() => ({ loading: "success" }));
    } catch (error) {
      set(() => ({ loading: "error" }));
      console.log(error);
    }
  },
}));

export default useTimetableStore;
