import { useUserStore } from "@/entities/user";
import { useEffect, useRef, useState } from "react";
import { useTimetableStore } from "../../models";
import { SelectClass } from "./SelectClass";

export const Title = () => {
  const timetableLoading = useTimetableStore((store) => store.loading);
  const getTimetable = useTimetableStore((store) => store.getTimetable);
  const classes = useUserStore((store) => store.data?.classes);
  const role = useUserStore((store) => store.data?.role.name);

  const [selectedClass, setSelectedClass] = useState<string>("");

  const isFirstLoading = useRef(false);

  useEffect(() => {
    if (classes && !isFirstLoading.current) {
      isFirstLoading.current = true;
      setSelectedClass(classes[0].name);
      getTimetable(classes[0].name);
    }
  }, [getTimetable, classes]);

  useEffect(() => {
    if (selectedClass && timetableLoading === "success") {
      getTimetable(selectedClass);
    }
  }, [selectedClass, getTimetable]);

  return (
    <div className="mt-24 flex md:flex-row flex-col md:items-center md:justify-between gap-4">
      <h1 className="text-3xl font-extrabold flex flex-wrap sm:flex-nowrap gap-5">
        Расписание
        {role !== "Student" && classes ? (
          <SelectClass
            setSelectedClass={setSelectedClass}
            selectedClass={selectedClass}
          />
        ) : (
          <span className="text-primary">{selectedClass}</span>
        )}
        класса
      </h1>
    </div>
  );
};
