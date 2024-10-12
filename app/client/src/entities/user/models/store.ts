import type { UserStore, ClearStore, LoginResponse, User } from "../types";

import axios from "axios";
import { create } from "zustand";

import { $axios } from "@/shared/api";
import { API_URL } from "@/shared/config";

const clearStore: ClearStore = (set, loading) => {
  set({
    loading,
    data: null,
    isAuth: false,
  });
  localStorage.removeItem("key");
};

export const useUserStore = create<UserStore>((set) => ({
  loading: "idle",
  isAuth: false,
  data: null,
  getMe: async () => {
    try {
      set(() => ({ loading: "loading" }));
      const response = await $axios.get(
        `/users/me?populate=role,classes,subjects`,
      );
      const data = response.data as User;

      set(() => ({ loading: "success", isAuth: true, data }));
      return true;
    } catch (error) {
      clearStore(set, "idle");
      console.log(error);
      return false;
    }
  },
  login: async (identifier, password) => {
    try {
      set(() => ({ loading: "loading" }));

      const response = await axios.post(`${API_URL}/auth/local`, {
        identifier,
        password,
      });
      const data = response.data as LoginResponse;
      const key = data.jwt;

      localStorage.setItem("key", key);

      set(() => ({ isAuth: true, loading: "success" }));
    } catch (error) {
      console.error(error);
      clearStore(set, "error");
    }
  },
  logout: () => {
    clearStore(set, "idle");
  },
}));
