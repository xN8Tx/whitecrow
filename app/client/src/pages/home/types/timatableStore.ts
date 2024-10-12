import { Loading } from "@/shared/types";
import { Timetable } from "./data";

export type TimetableStore = {
  getTimetable: (className: string) => Promise<void>;
  data: null | Timetable;
  loading: Loading;
};
