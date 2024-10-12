import { ToastContainer } from "react-toastify";
import { AppRouter } from "./routers";

import { useGetMe } from "@/entities/user";

import "./styles/index.css";

export const App = () => {
  useGetMe();

  return (
    <>
      <AppRouter />
      <ToastContainer />
    </>
  );
};
