import type { Dispatch, SetStateAction } from "react";
import type { AnswerForm } from "../types";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMemo, useState } from "react";

import { Button as NextButton } from "@nextui-org/react";

import { useCourseStore } from "../models";
import { useUserStore } from "@/entities/user";
import { useCoursesStore } from "@/entities/courses/models";

type ButtonProps = {
  answerValue: string;
  currentQuestionNumber: number;
  setCurrentQuestionNumber: Dispatch<SetStateAction<number>>;
};

export const Button = ({
  answerValue,
  currentQuestionNumber,
  setCurrentQuestionNumber,
}: ButtonProps) => {
  const navigate = useNavigate();

  const data = useCourseStore((store) => store.data);
  const userId = useUserStore((store) => store.data?.id);

  const sendAnswer = useCourseStore((store) => store.sendAnswer);
  const setCoursePassed = useCoursesStore((store) => store.setCoursePassed);

  const [form, setForm] = useState<AnswerForm>({
    userId: userId!,
    testId: data!.id,
    answers: {},
  });

  const isLast = useMemo(() => {
    return (
      Object.keys(form.answers).length >= data!.question.length - 1 &&
      currentQuestionNumber === data!.question.length
    );
  }, [currentQuestionNumber, data, form.answers]);

  const onSetAnswer = async () => {
    const title = data?.question[currentQuestionNumber - 1].title;

    if (!title) return toast.error("😿 Произошла ошибка.");
    if (answerValue === "") return toast.error("😺 Сначала выберите ответ.");

    console.log("Form:", form);

    const newForm = {
      ...form,
      answers: {
        ...form.answers,
        [title]: answerValue,
      },
    };

    console.log("New form:", newForm);

    if (isLast) {
      const res = await sendAnswer(newForm);
      if (!res)
        return toast.error(
          "😿 На сервере произошла ошибка, мы уже ее исправляем.",
        );

      toast.success("😻 Курс успешно пройден!");

      setCoursePassed(res);
      navigate("/courses");
    } else {
      const isLastQuestion = currentQuestionNumber === data.question.length;
      const page = isLastQuestion ? 1 : currentQuestionNumber + 1;

      setCurrentQuestionNumber(page);
    }
    setForm(newForm);
  };

  if (isLast) {
    return (
      <NextButton color="success" className="w-full" onClick={onSetAnswer}>
        Закончить
      </NextButton>
    );
  }

  return (
    <NextButton color="primary" className="w-full" onClick={onSetAnswer}>
      Ответить
    </NextButton>
  );
};
