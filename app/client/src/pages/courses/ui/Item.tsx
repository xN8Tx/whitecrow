import { Card, CardFooter, CardHeader, Image } from "@nextui-org/react";

import { ItemButton } from "./ItemButton";
import { SERVER_URL } from "@/shared/config";

type ItemProps = {
  subject: string;
  title: string;
  thumbnail: string;
  isPassed: boolean | undefined;
  id: number;
};

export const Item = ({
  subject,
  title,
  thumbnail,
  id,
  isPassed,
}: ItemProps) => {
  return (
    <Card className="h-[300px] bg-black/40 w-full md:w-[calc(50%-10px)] lg:w-[calc(33%-10px)] relative">
      <CardHeader className="z-10 flex flex-col items-start">
        <p className="text-tiny text-gray-300 uppercase font-bold">{subject}</p>
        <h4 className="text-white font-medium text-large">{title}</h4>
      </CardHeader>
      <Image
        removeWrapper
        alt="Card background"
        className="absolute -z-10 w-full h-full object-cover"
        src={`${SERVER_URL}${thumbnail}`}
      />
      <CardFooter className="absolute bottom-0">
        <ItemButton isPassed={isPassed} id={id} />
      </CardFooter>
    </Card>
  );
};
