import { Spinner } from "@nextui-org/react";

export const Loader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Spinner label="Загрузка..." color="primary" />
    </div>
  );
};
