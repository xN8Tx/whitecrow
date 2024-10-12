import type { Timetable } from "../../types";

import { Card, Tabs as NextTabs, Tab } from "@nextui-org/react";

import { useTimetableStore } from "../../models";
import { TabItem } from "./TabItem";
import { TabLoading } from "./TabLoading";

const days: Array<keyof Timetable> = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
];

export const Tabs = () => {
  const { loading } = useTimetableStore((state) => state);

  return (
    <div className=" mt-12 lg:max-w-[495px] w-full">
      <NextTabs color="primary" variant="bordered" className="w-full">
        {days.map((value) => (
          <Tab key={value} title={value}>
            <Card>
              {loading === "success" && <TabItem value={value} />}
              {loading === "loading" && <TabLoading />}
            </Card>
          </Tab>
        ))}
      </NextTabs>
    </div>
  );
};
