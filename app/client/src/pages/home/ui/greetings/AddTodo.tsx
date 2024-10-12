import type { Dispatch, SetStateAction } from "react";

import { Button, Input } from "@nextui-org/react";
import { toast } from "react-toastify";
import { useState } from "react";
import { useTodoStore } from "../../models";

type AddTodoProps = {
  setIsAddMode: Dispatch<SetStateAction<boolean>>;
};

export const AddTodo = ({ setIsAddMode }: AddTodoProps) => {
  const [taskName, setTaskName] = useState<string>("");

  const addTodo = useTodoStore((state) => state.add);

  const addTodoHandler = () => {
    if (taskName.length < 3)
      return toast.error("Задача должна быть больше 3 слов!");
    addTodo(taskName);
    setIsAddMode(false);
  };

  return (
    <div className="flex flex-col gap-2 justify-center">
      <Input
        variant="flat"
        color="primary"
        labelPlacement="inside"
        label="Задача"
        value={taskName}
        onValueChange={setTaskName}
      />
      <Button color="primary" onClick={addTodoHandler}>
        Готово
      </Button>
    </div>
  );
};
