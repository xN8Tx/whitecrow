import { Navbar, NavbarBrand } from "@nextui-org/react";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <main className="w-full h-screen">
      <Navbar isBordered>
        <NavbarBrand className="flex items-center justify-center">
          <Link
            to="/"
            className="font-bold text-inherit transition-all hover:text-primary"
          >
            Белая сова
          </Link>
        </NavbarBrand>
      </Navbar>
      <section className="w-full h-[calc(100vh-60px)] flex items-center justify-center flex-col gap-6">
        <div className="flex flex-col  items-center justify-center gap-2">
          <span className="text-4xl font-bold text-primary">404</span>
          <h1 className="text-2xl font-bold">Такой страницы не сущесвтует</h1>
        </div>
        <Link
          to="/"
          className="text-white font-medium bg-primary hover:bg-primary/60 transition rounded-md py-3 px-4"
        >
          На главную
        </Link>
      </section>
    </main>
  );
};
