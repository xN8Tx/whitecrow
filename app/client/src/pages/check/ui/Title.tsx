import { useCheckStore } from "../models";

export const Title = () => {
  const data = useCheckStore((store) => store.data);

  return (
    <div className="w-full flex flex-col gap-2 mt-24">
      <div className="flex flex-wrap gap-4">
        <p>Класс: {data?.user.className}</p>
        <p>Предмет: {data?.subject.name}</p>
      </div>
      <h2 className="text-2xl text-primary font-bold">Тест: {data?.title}</h2>
      <h3 className="text-xl font-medium">Ученик: {data?.user.name}</h3>
    </div>
  );
};
