import { useEffect, useState } from "react";
import { useCourseStore } from "../models";

import { Title } from "./Title";
import { Media } from "./Media";
import { Answers } from "./Answers";
import { Button } from "./Button";
import { Question } from "@/shared/types";

export const Wrapper = () => {
  const data = useCourseStore((store) => store.data);

  const [currentQuestionNumber, setCurrentQuestionNumber] = useState<number>(1);
  const [currentQuestion, setCurrentQuestion] = useState<Question>(
    data!.question[currentQuestionNumber - 1],
  );

  const [answerValue, setAnswerValue] = useState<string>("");

  useEffect(() => {
    setCurrentQuestion(data!.question[currentQuestionNumber - 1]);
    setAnswerValue("");
  }, [currentQuestionNumber, data]);

  return (
    <main className="max-w-[1536px] py-12  px-6 mx-auto flex flex-col gap-8">
      <Title
        currentQuestion={currentQuestion}
        currentQuestionNumber={currentQuestionNumber}
        setCurrentQuestionNumber={setCurrentQuestionNumber}
      />
      <div className="w-full md:h-[400px] flex flex-col md:flex-row gap-6 md:justify-between justify-start items-start">
        <div className="w-full md:w-1/3 md:h-full flex gap-6 flex-col justify-between">
          <Answers
            currentQuestion={currentQuestion}
            answerValue={answerValue}
            setAnswerValue={setAnswerValue}
          />
          <Button
            answerValue={answerValue}
            currentQuestionNumber={currentQuestionNumber}
            setCurrentQuestionNumber={setCurrentQuestionNumber}
          />
        </div>
        <Media
          url={currentQuestion.media.url}
          type={currentQuestion.media.type}
        />
      </div>
    </main>
  );
};
