import { SearchIcon } from "@/shared/assets/SearchIcon";
import { Input } from "@nextui-org/react";

type TitleProps = {
  searchValue: string;
  onValueChange: (value: string) => void;
};

export const Title = ({ searchValue, onValueChange }: TitleProps) => {
  return (
    <div className="flex justify-between items-center w-full">
      <h1 className="text-3xl font-extrabold">Ученики</h1>
      <Input
        value={searchValue}
        onValueChange={onValueChange}
        label="Поиск"
        placeholder="Введите имя или класс"
        variant="flat"
        color="primary"
        className="w-1/2 md:w-1/3"
        startContent={<SearchIcon />}
      />
    </div>
  );
};
