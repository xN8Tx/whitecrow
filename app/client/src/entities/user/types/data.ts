import type { Classes, Role, Subject } from "@/shared/types";

export type LoginResponse = {
  jwt: string;
  user: User;
};

export type User = {
  id: number;
  email: string;
  name: string;
  role: Role;
  classes: Classes[];
  subjects: Subject[];
};
