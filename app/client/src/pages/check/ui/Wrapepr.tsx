import { List } from "./List";
import { Review } from "./Review";
import { Title } from "./Title";

export const Wrapper = () => {
  return (
    <div className="max-w-[1536px] pb-12 mt-4 px-6 mx-auto flex flex-col">
      <Title />
      <div className="w-full flex flex-col md:items-start  md:flex-row gap-9 mt-12">
        <List />
        <Review />
      </div>
    </div>
  );
};
