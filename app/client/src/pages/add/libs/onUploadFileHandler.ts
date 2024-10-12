import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import type { Loading } from "@/shared/types";

import { toast } from "react-toastify";
import { $axios } from "@/shared/api";

export const onUploadFileHandler = async (
  event: ChangeEvent<HTMLInputElement>,
  setFileLoading: Dispatch<SetStateAction<Loading>>,
  setCoverHandler: (id: number) => void,
) => {
  const formData = new FormData();

  if (!event.currentTarget.files || !event.currentTarget.files[0]) return null;

  try {
    setFileLoading("loading");

    formData.append("files", event.currentTarget.files[0]);
    const response = await $axios.post("/upload", formData);
    const data = response.data;

    setCoverHandler(data[0].id as number);

    setFileLoading("success");
  } catch (error) {
    console.log(error);
    setFileLoading("error");
    return toast.error("Не получилось добавить файл!");
  }
};
