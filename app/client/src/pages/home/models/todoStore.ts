import type { Todo, TodoStore } from "../types";
import { create } from "zustand";

const localStorageData = localStorage.getItem("tasks");

const addToLocalStorage = (task: Todo[]) => {
  localStorage.setItem("tasks", JSON.stringify(task));
};

export const useTodoStore = create<TodoStore>((set, get) => ({
  data: localStorageData ? JSON.parse(localStorageData) : [],
  add: (name) => {
    const data = get().data;

    const newTask = {
      id: data.length + 1,
      status: false,
      name,
    };

    set(() => ({
      data: [...data, newTask],
    }));

    addToLocalStorage(get().data);
  },
  changeStatus: (id) => {
    set((state) => ({
      data: state.data.map((task) => {
        if (task.id !== id) return task;
        return {
          ...task,
          status: !task.status,
        };
      }),
    }));

    addToLocalStorage(get().data);
  },
  delete: (id) => {
    set((state) => ({
      data: state.data.filter((task) => task.id !== id),
    }));

    addToLocalStorage(get().data);
  },
}));
