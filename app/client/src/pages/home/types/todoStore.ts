export type Todo = {
  id: number;
  status: boolean;
  name: string;
};

export type TodoStore = {
  data: Todo[];
  add: (name: string) => void;
  delete: (id: number) => void;
  changeStatus: (id: number) => void;
};
