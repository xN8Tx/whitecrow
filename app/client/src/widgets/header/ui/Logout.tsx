import { Button, NavbarContent, NavbarItem } from "@nextui-org/react";
import { useUserStore } from "@/entities/user";

export const Logout = () => {
  const logout = useUserStore((state) => state.logout);

  return (
    <NavbarContent justify="end">
      <NavbarItem>
        <Button color="danger" variant="flat" onClick={() => logout()}>
          Выйти
        </Button>
      </NavbarItem>
    </NavbarContent>
  );
};
