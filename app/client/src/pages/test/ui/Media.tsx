import { Image } from "@nextui-org/react";
import { VideoPlayer } from "@/shared/ui";

import { SERVER_URL } from "@/shared/config";

type MediaProps = { url: string; type: string };

export const Media = ({ url, type }: MediaProps) => {
  if (url && type.split("/")[0] === "video") {
    return <VideoPlayer video={`${SERVER_URL}${url}`} type={type} />;
  }

  if (url) {
    return (
      <Image
        className="w-full md:min-w-2/3 h-[400px]"
        src={`${SERVER_URL}${url}`}
        alt="Фотография теста"
      />
    );
  }

  return <></>;
};
