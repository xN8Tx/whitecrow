import type { ReactNode } from "react";

import { NavbarContent, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import { NavLink } from "react-router-dom";

type WrapperProps = { children: ReactNode };
type NavigationProps = { type: "nav" | "menu" };

const menuItems = [
  { text: "Расписание", href: "/", isStudent: true },
  { text: "Курсы", href: "/courses", isStudent: true },
];

const NavigationWrapper = ({ children }: WrapperProps) => {
  return (
    <NavbarContent className="hidden sm:flex gap-4" justify="center">
      {children}
    </NavbarContent>
  );
};

const MenuWrapper = ({ children }: WrapperProps) => {
  return <NavbarMenu>{children}</NavbarMenu>;
};

const renderMenuItems = (className: (args: { isActive: boolean }) => string) =>
  menuItems.map((item) => (
    <NavbarMenuItem key={item.text}>
      <NavLink className={className} to={item.href}>
        {item.text}
      </NavLink>
    </NavbarMenuItem>
  ));

export const Navigation = ({ type }: NavigationProps) => {
  const className = ({ isActive }: { isActive: boolean }) =>
    isActive ? "font-bold text-primary" : "text-dark transition-all";

  const Wrapper = type === "menu" ? MenuWrapper : NavigationWrapper;

  return <Wrapper>{renderMenuItems(className)}</Wrapper>;
};
