import { Suspense, lazy } from "react";
import { Loader } from "@/shared/ui";

const LazyWrapper = lazy(() =>
  import("./Wrapper").then((file) => ({ default: file.Wrapper })),
);

export const SigninPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <LazyWrapper />
    </Suspense>
  );
};
