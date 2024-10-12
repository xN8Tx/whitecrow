import { Link } from "react-router-dom";
import { useUserStore } from "@/entities/user";

export const AddModal = () => {
  const role = useUserStore((store) => store.data?.role.name);
  if (role !== "Teacher") return null;

  return (
    <Link
      to="/courses/add"
      className="flex items-center justify-center fixed bottom-8 left-8 w-12 h-12 p-2 rounded-full bg-primary  transition hover:bg-blue-500"
    >
      <span className="w-1 h-full rounded-md relative bg-white after:block after:absolute after:bg-white  after:w-1 after:h-full after:rotate-90 after:rounded-md"></span>
    </Link>
  );
};
