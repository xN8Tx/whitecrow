import { Todo } from "../../types";
import { useTodoStore } from "../../models";

type TodoItemProps = {
  task: Todo;
};

export const TodoItem = ({ task }: TodoItemProps) => {
  const { changeStatus, delete: deleteTodo } = useTodoStore((state) => state);

  return (
    <li className="w-full flex justify-between gap-1">
      <span className="flex gap-3">
        <button
          onClick={() => changeStatus(task.id)}
          className="w-5 h-5 bg-transparent border-none"
        >
          {task.status ? "✅" : "❎"}
        </button>
        <p>{task.name}</p>
      </span>
      <button
        onClick={() => deleteTodo(task.id)}
        className="w-5 h-5 bg-transparent border-none"
      >
        🗑️
      </button>
    </li>
  );
};
