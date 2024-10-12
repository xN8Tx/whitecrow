import { Tabs } from "./Tabs";
import { Title } from "./Title";

export const TimetableComponent = () => {
  return (
    <div className="flex flex-col lg:w-3/5 w-full">
      <Title />
      <Tabs />
    </div>
  );
};
