import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useStudentStore } from "../models";

import { ErrorBoundary, Loader } from "@/shared/ui";
import { Wrapper } from "./Wrapper";

export const StudentsPage = () => {
  const { id } = useParams();

  const { loading, getStudents, resetStore } = useStudentStore(
    (strore) => strore,
  );

  useEffect(() => {
    if (id) getStudents(Number(id));

    return () => {
      resetStore();
    };
  }, [id, getStudents]);

  return (
    <>
      {loading === "loading" && <Loader />}
      {loading === "error" && <ErrorBoundary />}
      {loading === "success" && <Wrapper />}
    </>
  );
};
