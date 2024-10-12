import { Route, Routes } from "react-router-dom";
import { lazy } from "react";

import { useUserStore } from "@/entities/user";

import { Layout } from "../layout";
import { SigninPage } from "@/pages/signin/ui";
import { NotFound } from "@/widgets/not-found/ui";

const HomePage = lazy(() =>
  import("@/pages/home/ui").then((file) => ({ default: file.HomePage })),
);
const CoursesPage = lazy(() =>
  import("@/pages/courses/ui").then((file) => ({ default: file.CoursesPage })),
);
const StudentsPage = lazy(() =>
  import("@/pages/students/ui").then((file) => ({
    default: file.StudentsPage,
  })),
);
const CheckPage = lazy(() =>
  import("@/pages/check/ui").then((file) => ({
    default: file.CheckPage,
  })),
);
const AddPage = lazy(() =>
  import("@/pages/add/ui").then((file) => ({
    default: file.AddPage,
  })),
);
const TestPage = lazy(() =>
  import("@/pages/test/ui").then((file) => ({
    default: file.TestPage,
  })),
);

export const AppRouter = () => {
  const role = useUserStore((state) => state.data?.role.name);
  const isAuth = useUserStore((state) => state.isAuth);

  console.log(isAuth);

  return (
    <Routes>
      {!isAuth && <Route index element={<SigninPage />} />}
      {isAuth && (
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="courses/:id" element={<TestPage />} />
          {role === "Teacher" && (
            <Route path="courses/add" element={<AddPage />} />
          )}
          {role !== "Student" && (
            <>
              <Route path="students/:id" element={<StudentsPage />} />
              <Route path="check/:id" element={<CheckPage />} />
            </>
          )}
        </Route>
      )}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
