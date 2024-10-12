import { Navbar, NavbarMenuToggle } from "@nextui-org/react";
import { useState } from "react";

import { Navigation } from "./Navigation";
import { Logout } from "./Logout";
import { Logo } from "./Logo";

export const Header = () => {
  const [isMenuOpen, setisMenuOpen] = useState<boolean>(false);

  return (
    <Navbar isBordered onMenuOpenChange={setisMenuOpen} maxWidth="2xl">
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
      <Logo />
      <Navigation type="nav" />
      <Logout />
      <Navigation type="menu" />
    </Navbar>
  );
};
