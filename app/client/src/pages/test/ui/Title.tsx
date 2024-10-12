import { Question } from "@/shared/types";
import { Pagination } from "@nextui-org/react";

import { useCourseStore } from "../models";

type TitleProps = {
  currentQuestionNumber: number;
  currentQuestion: Question;
  setCurrentQuestionNumber: React.Dispatch<React.SetStateAction<number>>;
};

export const Title = ({
  currentQuestionNumber,
  currentQuestion,
  setCurrentQuestionNumber,
}: TitleProps) => {
  const data = useCourseStore((store) => store.data);

  const onPaginationChange = (page: number) => {
    setCurrentQuestionNumber(page);
  };

  return (
    <div className="flex flex-col-reverse gap-8 lg:flex-row lg:justify-between">
      <div className="flex flex-col gap-4">
        <h2 className="text-medium font-medium">
          Тест <span className="text-primary">{data?.title}</span>
        </h2>
        <h1 className="text-3xl font-extraboldbold">{currentQuestion.title}</h1>
      </div>
      <Pagination
        variant="bordered"
        total={data!.question.length}
        page={currentQuestionNumber}
        onChange={onPaginationChange}
      />
    </div>
  );
};
