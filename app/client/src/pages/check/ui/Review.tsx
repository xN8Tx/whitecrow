import type { Loading } from "@/shared/types";

import { Button, Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useUserStore } from "@/entities/user";
import { useCheckStore } from "../models";

export const Review = () => {
  const role = useUserStore((store) => store.data?.role.name);

  const teacherReview = useCheckStore((store) => store.data?.teacherReview);
  const psychologistReview = useCheckStore(
    (store) => store.data?.psychologistReview,
  );
  const uploadReview = useCheckStore((store) => store.uploadReview);

  const [value, setValue] = useState<string>("");
  const [uploadLoading, setUploadLoading] = useState<Loading>("idle");

  const onClickHandler = async () => {
    setUploadLoading("loading");

    const res = await uploadReview(value);

    if (res) {
      toast.success("Ответ успешно записан");
      return setUploadLoading("idle");
    }
    toast.error("Произошла ошибка");
    return setUploadLoading("error");
  };

  useEffect(() => {
    if (role === "Psychologist") {
      setValue(psychologistReview ? psychologistReview : "");
    } else if (role === "Teacher") {
      setValue(teacherReview ? teacherReview : "");
    }
  }, [role, teacherReview, psychologistReview]);

  return (
    <div className="flex flex-col gap-3 w-full md:w-2/3">
      <Textarea
        value={role === "Psychologist" ? value : psychologistReview}
        onValueChange={role === "Psychologist" ? setValue : () => {}}
        isDisabled={role !== "Psychologist"}
        label="Отзыв психолога"
      />
      <Textarea
        value={role === "Teacher" ? value : teacherReview}
        onValueChange={role === "Teacher" ? setValue : () => {}}
        isDisabled={role !== "Teacher"}
        label="Отзыв учителя"
      />
      <Button
        color={uploadLoading === "error" ? "danger" : "success"}
        onClick={onClickHandler}
        isLoading={uploadLoading === "loading"}
        isDisabled={uploadLoading === "error"}
      >
        Проверить
      </Button>
    </div>
  );
};
