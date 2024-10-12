import { useCheckStore } from "../models";
import { Item } from "./Item";

export const List = () => {
  const question = useCheckStore((store) => store.data?.question);
  const answers = useCheckStore((store) => store.data?.answers);

  return (
    <div className="w-full md:w-1/3 h-[480px] flex flex-col gap-5 overflow-y-scroll">
      {question!.map((q, index) => (
        <Item
          key={`${q.id}-${q.title}-${index}`}
          questionText={q.title}
          answers={q.answers}
          studentAnswer={answers![q.title]}
        />
      ))}
    </div>
  );
};
