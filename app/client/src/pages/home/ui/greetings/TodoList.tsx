import { useTodoStore } from "../../models";
import { TodoItem } from "./TodoItem";

export const TodoList = () => {
  const { data } = useTodoStore((state) => state);
  const isTodoEmpty = data.length === 0;

  return (
    <ul className="flex flex-col gap-2">
      {!isTodoEmpty ? (
        data.map((task) => <TodoItem key={task.id} task={task} />)
      ) : (
        <div className="w-full flex justify-center">Задач нет</div>
      )}
    </ul>
  );
};
