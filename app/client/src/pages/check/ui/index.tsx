import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useCheckStore } from "../models";
import { ErrorBoundary, Loader } from "@/shared/ui";
import { Wrapper } from "./Wrapepr";

export const CheckPage = () => {
  const { id } = useParams();

  const { loading, resetStore, getData } = useCheckStore((store) => store);

  useEffect(() => {
    if (id && !isNaN(Number(id))) {
      getData(Number(id!));
    }
    return () => {
      resetStore();
    };
  }, []);

  return (
    <>
      {loading === "loading" && <Loader />}
      {loading === "error" && <ErrorBoundary />}
      {loading === "success" && <Wrapper />}
    </>
  );
};
