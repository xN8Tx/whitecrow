import { useEffect, useMemo, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { toast } from "react-toastify";

import { PasswordViibilityButton } from "./PasswordVisibilityButton";
import { MailIcon } from "../assets/icons/MailIcon";
import { useUserStore } from "@/entities/user";

type FormData = {
  email: string;
  password: string;
};

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const initFormData: FormData = {
  email: "",
  password: "",
};

export const Form = () => {
  const { loading, login } = useUserStore((state) => state);

  const [formData, setFormData] = useState<FormData>(initFormData);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const isEmilValid = useMemo(() => {
    if (formData.email === "") return false;
    return emailRegex.test(formData.email) ? false : true;
  }, [formData.email]);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    login(formData.email, formData.password);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.currentTarget.name;

    setFormData({
      ...formData,
      [name]: event.currentTarget.value,
    });
  };

  useEffect(() => {
    if (loading === "error") {
      toast.error("Неправильная почта или пароль");
      setFormData((prev) => ({ ...prev, password: "" }));
    }
  }, [loading]);

  return (
    <div className="w-2/3 h-full flex flex-col gap-14 justify-center items-center p-8 text-center">
      <h1 className="text-3xl font-bold text-primary">Войти в Белую Ворону</h1>
      <form className="flex flex-col gap-6 w-full max-w-sm space-y-4">
        <Input
          errorMessage={isEmilValid && "Введите коректную почту"}
          color={isEmilValid ? "danger" : "default"}
          placeholder="you@example.com"
          labelPlacement="outside"
          isInvalid={isEmilValid}
          value={formData.email}
          onChange={onChange}
          variant="flat"
          label="Почта"
          name="email"
          type="email"
          size="lg"
          startContent={
            <MailIcon className="text-2xl text-primary pointer-events-none flex-shrink-0" />
          }
        />
        <Input
          type={isVisible ? "text" : "password"}
          placeholder="Введите ваш пароль"
          value={formData.password}
          labelPlacement="outside"
          onChange={onChange}
          name="password"
          color="default"
          label="Пароль"
          variant="flat"
          size="lg"
          startContent={
            <PasswordViibilityButton
              isVisible={isVisible}
              setIsVisible={setIsVisible}
            />
          }
        />
        <Button
          size="lg"
          color="primary"
          isLoading={loading === "loading"}
          onClick={onClick}
        >
          Войти
        </Button>
      </form>
    </div>
  );
};
