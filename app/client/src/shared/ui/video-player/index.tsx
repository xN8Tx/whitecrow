import { useCallback, useEffect, useRef } from "react";
import Plyr from "plyr";

import "plyr/dist/plyr.css";

type VideoPlayerProps = {
  poster?: string;
  video: string;
  type: string;
};

export const VideoPlayer = ({
  poster = "/poster.jpg",
  video,
  type,
}: VideoPlayerProps) => {
  const plyrPlayer = useRef<Plyr>();

  const changeVideoHandler = useCallback(() => {
    if (!plyrPlayer.current) return null;
    plyrPlayer.current.poster = poster;

    plyrPlayer.current.source = {
      type: "video",
      sources: [{ src: video, type: type }],
    };
  }, [plyrPlayer, poster, video, type]);

  useEffect(() => {
    plyrPlayer.current = new Plyr("#player");
    changeVideoHandler();

    return () => {
      if (plyrPlayer.current) plyrPlayer.current.destroy();
    };
  }, [changeVideoHandler]);

  useEffect(() => {
    changeVideoHandler();
  }, [video, type, poster, changeVideoHandler]);

  return (
    <div className="w-full md:w-2/3 md:h-[400px]">
      <video id="player" controls />
    </div>
  );
};
