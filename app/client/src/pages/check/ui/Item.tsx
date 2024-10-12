import type { AnswerWithCorrect } from "@/shared/types";

type ItemProps = {
  questionText: string;
  answers: AnswerWithCorrect[];
  studentAnswer: string | undefined;
};

export const Item = ({ questionText, answers, studentAnswer }: ItemProps) => {
  const correctAnswer = answers.find((a) => a.isCorrect)?.text;

  return (
    <div className="flex flex-col gap-1">
      <p className="font-medium">Вопрос: {questionText}</p>
      <p>Правильный ответ: {correctAnswer}</p>
      <p
        className={
          correctAnswer === studentAnswer ? "text-success" : "text-danger"
        }
      >
        Ответ ученика: {studentAnswer ? studentAnswer : "Не указан"}
      </p>
    </div>
  );
};
