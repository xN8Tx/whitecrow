import { TimetableComponent } from "./timetable";
import Greetings from "./greetings";

export const HomePage = () => {
  return (
    <main className="max-w-[1536px] pb-12 px-6 mx-auto flex flex-col lg:flex-row lg:justify-between gap-9">
      <TimetableComponent />
      <Greetings />
    </main>
  );
};
