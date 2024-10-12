import { Link } from "react-router-dom";

type ItemProps = {
  name: string;
  classes: string;
  id: number;
};

export const Item = ({ name, classes, id }: ItemProps) => {
  return (
    <Link
      to={`/check/${id}`}
      className="w-full md:w-[calc(50%-14px)] lg:w-[calc(33.333%-14px)] rounded-md flex flex-col gap-2 bg-primary-50 px-4 py-6 hover:bg-primary hover:text-white"
    >
      <p className="font-medium text-xl">{name}</p>
      <p>Ученик {classes} класса</p>
    </Link>
  );
};
