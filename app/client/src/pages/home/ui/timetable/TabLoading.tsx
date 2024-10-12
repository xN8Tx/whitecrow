import { Spinner } from "@nextui-org/react";

export const TabLoading = () => {
  return (
    <div className="w-full py-8 flex justify-center">
      <Spinner label="Загрузка..." color="primary" />
    </div>
  );
};
