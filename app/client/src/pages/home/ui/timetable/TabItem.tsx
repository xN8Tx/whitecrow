import type { Timetable } from "../../types";

import { CardBody } from "@nextui-org/react";
import { useTimetableStore } from "../../models";

type TabItemProps = {
  value: keyof Timetable;
};

export const TabItem = ({ value }: TabItemProps) => {
  const { data } = useTimetableStore((state) => state);

  return (
    <CardBody>
      {data && data[value] ? (
        <>
          {data[value].map((item, index) => (
            <div
              className="max-w-full flex justify-between"
              key={`${item.subject}-${item.time}-${index}`}
            >
              <span className="font-medium sm:w-1/3 text-center">
                {item.time}
              </span>
              <span className="sm:w-1/3">{item.subject}</span>
            </div>
          ))}
        </>
      ) : (
        <div className="w-full py-8 flex justify-center">
          <p className="text-medium font-medium">😴 Занятий нет</p>
        </div>
      )}
    </CardBody>
  );
};
