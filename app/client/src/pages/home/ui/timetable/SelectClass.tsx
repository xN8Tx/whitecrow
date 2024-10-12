import { useUserStore } from "@/entities/user";
import { Select, SelectItem } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";

type SelectClass = {
  setSelectedClass: Dispatch<SetStateAction<string>>;
  selectedClass: string;
};

export const SelectClass = ({
  setSelectedClass,
  selectedClass,
}: SelectClass) => {
  const classes = useUserStore((store) => store.data?.classes);

  const onClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedClass(value);
  };

  return (
    <Select
      selectedKeys={[selectedClass]}
      onChange={onClassChange}
      className="min-w-20"
      color="primary"
      variant="flat"
      size="md"
    >
      {classes!.map((cl) => (
        <SelectItem key={`${cl.name}`} value={cl.name}>
          {cl.name}
        </SelectItem>
      ))}
    </Select>
  );
};
