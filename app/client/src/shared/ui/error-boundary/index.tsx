import { Button } from "@nextui-org/react";

export const ErrorBoundary = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-3xl font-bold text-danger">
        Произошла ошибка, попробуйте перезагрузить сайт
      </h1>
      <p className="text-xl font-medium">
        Если ошибка не прошла, свяжитесь с администратором
      </p>
      <Button color="primary" onClick={() => location.reload()}>
        Перезагрузить
      </Button>
    </div>
  );
};
