import type { Dispatch, SetStateAction } from "react";
import type { CreateCourse } from "../types";
import type { Classes, Loading, Subject } from "@/shared/types";

import { useState } from "react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";

import { useUserStore } from "@/entities/user";
import { onUploadFileHandler } from "../libs";

type TitleProps = {
  course: CreateCourse;
  setCourse: Dispatch<SetStateAction<CreateCourse>>;
};

export const Title = ({ course, setCourse }: TitleProps) => {
  const teacherData = useUserStore((s) => s.data);
  const [fileLoading, setFileLoading] = useState<Loading>("idle");

  const setTitleHandler = (value: string) => {
    setCourse((prev) => ({ ...prev, title: value }));
  };

  const setCoverHandler = (data: number) => {
    setCourse((course) => ({
      ...course,
      thumbnail: data,
    }));
  };

  const setCourseHandler = (cl: Classes, name: "className" | "subject") => {
    setCourse((prev) => ({ ...prev, [name]: cl }));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 mt-8">
      <Input
        label="Название курса"
        className="w-full lg:w-1/3"
        variant="bordered"
        color="primary"
        value={course.title}
        onValueChange={setTitleHandler}
      />
      {teacherData && (
        <div className="lg:w-1/3 flex gap-6">
          <Select label="Класс" variant="bordered" color="primary">
            {teacherData.classes.map((cl: Classes) => (
              <SelectItem
                key={`${cl.id}`}
                onClick={() => setCourseHandler(cl, "className")}
                variant="shadow"
                color="primary"
              >
                {cl.name}
              </SelectItem>
            ))}
          </Select>
          <Select label="Предмет" variant="bordered" color="primary">
            {teacherData.subjects.map((sb: Subject) => (
              <SelectItem
                key={`${sb.id}`}
                onClick={() => setCourseHandler(sb, "subject")}
                variant="shadow"
                color="primary"
              >
                {sb.name}
              </SelectItem>
            ))}
          </Select>
        </div>
      )}
      <div className="w-full h-[56px] relative lg:w-1/3">
        <input
          type="file"
          className="absolute w-full h-full  z-10 top-0 left-0 opacity-0"
          style={{ display: `${course.thumbnail ? "none" : "block"}` }}
          onChange={(e) =>
            onUploadFileHandler(e, setFileLoading, setCoverHandler)
          }
        />
        <Button
          className="w-full h-full"
          color={course.thumbnail ? "success" : "primary"}
          isDisabled={course.thumbnail ? true : false}
          isLoading={fileLoading === "loading"}
        >
          {course.thumbnail ? "Обложка добавлена" : "Добавить обложку"}
        </Button>
      </div>
    </div>
  );
};
