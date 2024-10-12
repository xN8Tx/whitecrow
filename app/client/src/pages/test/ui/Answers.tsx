import type { Question } from "@/shared/types";

import { Radio, RadioGroup } from "@nextui-org/react";
import { SetStateAction } from "react";

type AnswersProps = {
  currentQuestion: Question;
  answerValue: string;
  setAnswerValue: React.Dispatch<SetStateAction<string>>;
};

export const Answers = ({
  currentQuestion,
  answerValue,
  setAnswerValue,
}: AnswersProps) => {
  const onValueChange = (value: string) => setAnswerValue(value);

  return (
    <RadioGroup
      label="Выбeрите ответ"
      value={answerValue}
      onValueChange={onValueChange}
    >
      {currentQuestion.answers.map((answer) => (
        <Radio value={answer.text} key={answer.text}>
          {answer.text}
        </Radio>
      ))}
    </RadioGroup>
  );
};
