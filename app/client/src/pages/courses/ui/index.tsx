import type { Courses } from "@/shared/types";
import { useEffect, useState } from "react";

import { Input } from "@nextui-org/react";

import { useCoursesStore } from "@/entities/courses";
import { useUserStore } from "@/entities/user";

import { AddModal } from "./AddModal";
import { List } from "./List";
import { SearchIcon } from "@/shared/assets/SearchIcon";
import { DataNotFound } from "@/widgets/data-not-found/ui";

export const CoursesPage = () => {
  const { data, getFilteredData, getCourses, getAllCourses } = useCoursesStore(
    (state) => state,
  );

  const role = useUserStore((state) => state.data?.role.name);
  const userId = useUserStore((state) => state.data?.id);
  const className = useUserStore((state) => state.data?.classes[0].name);

  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Courses[]>([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };

  useEffect(() => {
    if (role === "Student") {
      getCourses(className!, userId!);
    } else {
      getAllCourses();
    }
  }, []);

  useEffect(() => {
    if (data && filteredData.length === 0) {
      setFilteredData(data);
    }
  }, [data]);

  useEffect(() => {
    const filteredData = getFilteredData(searchValue);
    setFilteredData(filteredData);
  }, [searchValue, getFilteredData]);

  return (
    <main className="max-w-[1536px] pb-12 pt-24  px-6 mx-auto flex flex-col">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-3xl font-extrabold">Курсы</h1>
        <Input
          value={searchValue}
          onChange={onChange}
          label="Поиск"
          placeholder="Введите название"
          variant="flat"
          color="primary"
          className="w-1/2 md:w-1/3"
          startContent={<SearchIcon />}
        />
      </div>
      {filteredData.length !== 0 && <List data={filteredData} />}
      {filteredData.length === 0 && <DataNotFound />}
      <AddModal />
    </main>
  );
};
