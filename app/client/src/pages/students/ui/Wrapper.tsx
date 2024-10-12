import { useState } from "react";

import { Title } from "./Title";
import { List } from "./List";

export const Wrapper = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const onSearchValue = (value: string) => setSearchValue(value);

  return (
    <main className="max-w-[1536px] pb-12 pt-24  px-6 mx-auto flex flex-col">
      <Title searchValue={searchValue} onValueChange={onSearchValue} />
      <List searchValue={searchValue} />
    </main>
  );
};
