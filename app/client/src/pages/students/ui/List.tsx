import type { PreloadStudentAnswer } from "../types";

import { useEffect, useState } from "react";

import { useStudentStore } from "../models";
import { Item } from "./Item";

type ListProps = {
  searchValue: string;
};

export const List = ({ searchValue }: ListProps) => {
  const getFilteredData = useStudentStore((store) => store.getFilteredData);

  const [data, setData] = useState<PreloadStudentAnswer[]>([]);

  useEffect(() => {
    setData(getFilteredData(searchValue));
  }, [searchValue]);

  return (
    <div className="mt-12 flex flex-wrap gap-5 items-center">
      {data.length === 0 && (
        <h2 className="w-full mt-[10%] text-center text-2xl font-bold text-sky-400">
          Ничего не найдено
        </h2>
      )}
      {data.length !== 0 &&
        data.map((student, index) => (
          <Item
            key={`${student.user.name}-${index}-${student.id}`}
            id={student.id}
            classes={student.user.className}
            name={student.user.name}
          />
        ))}
    </div>
  );
};
