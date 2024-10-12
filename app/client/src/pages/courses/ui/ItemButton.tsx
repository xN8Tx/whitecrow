import { Link } from "react-router-dom";
import { useUserStore } from "@/entities/user";

type ItemButtonProps = {
  id: number;
  isPassed: boolean | undefined;
};

export const ItemButton = ({ id, isPassed }: ItemButtonProps) => {
  const role = useUserStore((state) => state.data?.role.name);

  if (role !== "Student") {
    return (
      <Link
        to={`/students/${id}`}
        className="bg-primary py-2 px-4 text-white rounded-xl transition hover:bg-blue-500"
      >
        ✍️ Проверить
      </Link>
    );
  }

  if (isPassed) {
    return (
      <div className="bg-success py-2 px-4 rounded-xl transition hover:bg-green-500">
        👌Пройден
      </div>
    );
  }

  return (
    <Link
      to={`/courses/${id}`}
      className="bg-primary py-2 px-4 text-white rounded-xl transition hover:bg-blue-500"
    >
      ✍️ Пройти
    </Link>
  );
};
