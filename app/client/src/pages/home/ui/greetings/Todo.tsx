import { useState } from "react";

import { TodoList } from "./TodoList";
import { AddTodo } from "./AddTodo";

const Todo = () => {
  const [isAddMode, setIsAddMode] = useState<boolean>(false);
  const setIsAddModeHandler = () => setIsAddMode((prev) => !prev);

  return (
    <div className="text-foreground box-border bg-content1 shadow-medium rounded-large px-6 pb-8 py-7 flex flex-col gap-4">
      <div className="flex justify-between">
        <p className="text-xl font-bold">TODO</p>
        <button
          className="w-5 h-5 bg-transparent border-none"
          onClick={setIsAddModeHandler}
        >
          {isAddMode ? "🚫" : "➕"}
        </button>
      </div>
      {isAddMode ? <AddTodo setIsAddMode={setIsAddMode} /> : <TodoList />}
    </div>
  );
};

export default Todo;
