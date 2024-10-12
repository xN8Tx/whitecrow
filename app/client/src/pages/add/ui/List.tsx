import type { Dispatch, SetStateAction } from "react";
import type { CreateCourse } from "../types";

import { useEffect, useState } from "react";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";

import { Item } from "./Item";

type CourseQuestionListProps = {
  course: CreateCourse;
  setCourse: Dispatch<SetStateAction<CreateCourse>>;
};

const getCourseItems = (questionCount: number) => {
  const courses = [];
  for (let i = 0; i < questionCount; i++) {
    courses.push(i);
  }
  return courses;
};

export const List = ({ course, setCourse }: CourseQuestionListProps) => {
  const [questionCount, setQuestionCount] = useState<number>(
    course.question.length > 0 ? course.question.length : 1,
  );

  const incrementQuestionHandler = () => {
    setQuestionCount(questionCount + 1);
  };

  useEffect(() => {
    setQuestionCount(course.question.length > 0 ? course.question.length : 1);
  }, [course]);

  return (
    <div className="flex flex-col gap-6 mt-8">
      <div>
        <Accordion variant="bordered">
          {getCourseItems(questionCount).map((i) => (
            <AccordionItem title={`Вопрос ${i + 1}`} key={`${i}`}>
              <Item key={`${i}`} course={course} setCourse={setCourse} id={i} />
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <Button onClick={incrementQuestionHandler} variant="flat" color="primary">
        Добавить вопрос
      </Button>
    </div>
  );
};
