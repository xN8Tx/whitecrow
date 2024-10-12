import { Outlet } from "react-router-dom";
import { Suspense } from "react";

import { Header } from "@/widgets/header";
import { ErrorBoundary, Loader } from "@/shared/ui";
import { useUserStore } from "@/entities/user";

export const Layout = () => {
  const isLoading = useUserStore((store) => store.loading);

  return (
    <>
      {isLoading === "error" && <ErrorBoundary />}
      {isLoading === "loading" && <Loader />}
      {isLoading === "success" && (
        <>
          <Header />
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </>
      )}
    </>
  );
};
