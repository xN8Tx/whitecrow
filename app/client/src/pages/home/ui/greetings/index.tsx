import { useUserStore } from "@/entities/user";
import Todo from "./Todo";

const goodDayPhrase = {
  Student: "выучить новое",
  Teacher: "научить новому",
  Psychologist: "помочь в трудный момент",
};

const Greetings = () => {
  const user = useUserStore((store) => store.data);

  return (
    <>
      {user && (
        <div className="mt-24 flex flex-col gap-3 lg:w-2/5 w-full">
          <h2 className="text-2xl font-bold">
            Привет,
            <span className="text-primary"> {user.name}</span> 👋
          </h2>
          <h3 className="text-xl font-medium">
            Сегодня отличный день чтобы {goodDayPhrase[user.role.name]}
          </h3>
          <Todo />
        </div>
      )}
    </>
  );
};

export default Greetings;
