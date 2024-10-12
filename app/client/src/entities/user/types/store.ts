import type { Loading } from "@/shared/types";
import type { User } from "./data";

export type UserStore = {
  isAuth: boolean;
  loading: Loading;
  data: null | User;
  getMe: () => Promise<boolean>;
  login: (identifier: string, password: string) => Promise<void>;
  logout: () => void;
};

type SetType = (
  partial:
    | UserStore
    | Partial<UserStore>
    | ((state: UserStore) => UserStore | Partial<UserStore>),
  replace?: boolean | undefined,
) => void;

export type ClearStore = (set: SetType, loading: Loading) => void;
