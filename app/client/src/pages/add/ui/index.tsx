import type { Classes, Subject, Loading } from "@/shared/types";
import type { CreateCourse } from "../types";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { toast } from "react-toastify";

import { $axios } from "@/shared/api";
import { Title } from "./Title";
import { List } from "./List";

const initialCourse: CreateCourse = {
  title: "",
  thumbnail: null,
  className: {} as Classes,
  subject: {} as Subject,
  question: [],
};

export const AddPage = () => {
  const navigate = useNavigate();

  const [course, setCourse] = useState<CreateCourse>(initialCourse);
  const [postLoading, setPostLoading] = useState<Loading>("idle");

  const onPostCourse = async () => {
    try {
      setPostLoading("loading");
      await $axios.post("/tests", course);
      navigate("/courses");
      toast.success("Курс успешно добавлен");
      localStorage.removeItem("course");
      setPostLoading("success");
    } catch (error) {
      console.log(error);
      setPostLoading("error");
      toast.error("Не удалось выложить курс");
    }
  };

  useEffect(() => {
    if (Object.is(course, initialCourse)) return () => {};
    localStorage.setItem("course", JSON.stringify(course));
  }, [course]);

  useEffect(() => {
    const localStore = localStorage.getItem("course");
    if (!localStore) return () => {};

    const course: CreateCourse = JSON.parse(localStore);
    setCourse(course);
  }, []);

  return (
    <main className="max-w-[1536px] pb-12 pt-24  px-6 mx-auto flex flex-col gap-6">
      <h2 className="text-2xl text-primary font-bold">Добавление курса</h2>
      <Title course={course} setCourse={setCourse} />
      <List course={course} setCourse={setCourse} />
      <Button
        variant="solid"
        isLoading={postLoading === "loading"}
        isDisabled={postLoading === "error"}
        color={postLoading === "error" ? "danger" : "success"}
        onClick={onPostCourse}
      >
        Опубликовать
      </Button>
    </main>
  );
};
