import type { CheckStore } from "../types";

import { create } from "zustand";
import { $axios } from "@/shared/api";

export const useCheckStore = create<CheckStore>((set, get) => ({
  loading: "idle",
  data: null,
  getData: async (answerId) => {
    try {
      const { loading } = get();
      if (loading !== "idle" && loading !== "error") return;

      set(() => ({ loading: "loading" }));

      const response = await $axios.get(`/student-answers/${answerId}`);
      const data = response.data.data;

      set(() => ({ loading: "success", data: data }));
    } catch (error) {
      console.log(error);
      set(() => ({ loading: "error" }));
    }
  },
  resetStore: () => {
    set(() => ({ loading: "idle", data: null }));
  },
  uploadReview: async (review) => {
    try {
      const id = get().data?.answerId;

      const response = await $axios.put(`/student-answers/${id}`, {
        review: review,
      });

      return response.status === 200;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
}));
