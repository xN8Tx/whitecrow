import type { Dispatch, SetStateAction } from "react";
import type { CreateCourse } from "../types";
import type { Loading } from "@/shared/types";

import { useEffect, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { toast } from "react-toastify";

import { onUploadFileHandler } from "../libs";

type Answers = {
  text: string;
  isCorrect: boolean;
  id?: number;
};

type ItemProps = {
  course: CreateCourse;
  setCourse: Dispatch<SetStateAction<CreateCourse>>;
  id: number;
};

export const Item = ({ course, setCourse, id }: ItemProps) => {
  const [fileLoading, setFileLoading] = useState<Loading>("idle");

  const [correctId, setCorrectId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [answers, setAnswers] = useState<Answers[]>(
    course.question[id]?.answers || [],
  );

  const answersChangeHandler = (text: string, id: number) => {
    setAnswers([
      ...answers.filter((v) => v.id !== id),
      { text, id, isCorrect: false },
    ]);
  };

  const setCorrectAnswer = (value: string) => {
    setCorrectId(value);

    console.log(value);
    if (value === "") return;
    if (answers.length !== 4) return toast.error("Заполните все вопросы!");
    if (Number(value) > 4 || Number(value) < 1) {
      return toast.error("Введите число от 1 до 4");
    }
    setAnswers(
      answers.map((ans, index) => ({
        ...ans,
        isCorrect: index === Number(value) - 1,
      })),
    );
  };

  const addQuestionHandler = () => {
    setCourse({
      ...course,
      question: [
        ...course.question.slice(0, id),
        {
          title,
          answers,
          media: null,
        },
        ...course.question.slice(id + 1),
      ],
    });
  };

  const setQuestionHandler = () => {
    if (title.length < 5)
      return toast.error("Название должно быть не менее 5 символов");
    if (!answers.some((answer) => answer.isCorrect))
      return toast.error("Укажите правильный ответ!");

    addQuestionHandler();
    toast.success("Вопрос сохранен");
  };

  const onMediaHandler = (media: number) => {
    setCourse((prevCourse) => ({
      ...prevCourse,
      question: prevCourse.question.map((question, index) =>
        index === id ? { ...question, media } : question,
      ),
    }));
  };

  useEffect(() => {
    const question = course.question[id];
    if (!question) return;

    setTitle(question.title);
    setAnswers(question.answers);
    setCorrectId(String(question.answers.findIndex((v) => v.isCorrect) + 1));
  }, [course.question]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col lg:flex-row gap-3">
        <Input
          label="Вопрос"
          value={title}
          color="primary"
          onValueChange={setTitle}
          className="mb-2"
        />
        <div className="w-full h-[56px] relative lg:w-1/3">
          <input
            type="file"
            className="absolute w-full h-full  z-10 top-0 left-0 opacity-0"
            style={{
              display: `${course.question[id]?.media ? "none" : "block"}`,
            }}
            onChange={(e) =>
              onUploadFileHandler(e, setFileLoading, onMediaHandler)
            }
          />
          <Button
            className="w-full h-full"
            color={course.question[id]?.media ? "success" : "primary"}
            isDisabled={course.question[id]?.media ? true : false}
            isLoading={fileLoading === "loading"}
          >
            {course.thumbnail ? "Обложка добавлена" : "Добавить обложку"}
          </Button>
        </div>
      </div>
      <p className="py-3 text-center w-full"> Ответы</p>
      <Input
        label="Ответ 1"
        variant="bordered"
        color="primary"
        value={answers.find((v) => v.id === 0)?.text || ""}
        onValueChange={(v) => answersChangeHandler(v, 0)}
      />
      <Input
        label="Ответ 2"
        variant="bordered"
        color="primary"
        value={answers.find((v) => v.id === 1)?.text || ""}
        onValueChange={(v) => answersChangeHandler(v, 1)}
      />

      <Input
        label="Ответ 3"
        variant="bordered"
        color="primary"
        value={answers.find((v) => v.id === 2)?.text || ""}
        onValueChange={(v) => answersChangeHandler(v, 2)}
      />

      <Input
        label="Ответ 4"
        variant="bordered"
        color="primary"
        value={answers.find((v) => v.id === 3)?.text || ""}
        onValueChange={(v) => answersChangeHandler(v, 3)}
      />

      <Input
        label="Номер правильного ответа"
        placeholder="От 1 до 4"
        color="primary"
        type="number"
        value={correctId.toString()}
        onValueChange={setCorrectAnswer}
      />

      <div className="py-3 w-full" />

      <Button onClick={setQuestionHandler} color="success">
        Сохранить вопрос
      </Button>
    </div>
  );
};
