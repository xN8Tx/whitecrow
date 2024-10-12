import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { useCourseStore } from "../models";

import { Wrapper } from "./Wrapper";
import { ErrorBoundary, Loader } from "@/shared/ui";

export const TestPage = () => {
  const params = useParams();
  const loading = useCourseStore((store) => store.loading);

  const getCourse = useCourseStore((store) => store.getCourse);
  const resetStore = useCourseStore((store) => store.resetStore);

  useEffect(() => {
    const id = Number(params.id);

    if (!id) {
      toast.error("Произошла какая-то ошибка!");
    } else {
      getCourse(id);
    }

    return () => {
      resetStore();
    };
  }, [resetStore, getCourse, params.id]);

  return (
    <>
      {loading === "error" && <ErrorBoundary />}
      {loading === "loading" && <Loader />}
      {loading === "success" && <Wrapper />}
    </>
  );
};
