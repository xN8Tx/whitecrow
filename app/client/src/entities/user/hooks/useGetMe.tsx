import { useEffect, useRef } from "react";
import { useUserStore } from "../models";

export const useGetMe = () => {
  const { getMe, isAuth } = useUserStore((store) => store);
  const isLoaded = useRef(false);

  useEffect(() => {
    const fetchMe = async () => {
      if (!isLoaded.current) {
        isLoaded.current = true;
        const status = await getMe();
        console.log(status);
        isLoaded.current = status;
      }
    };

    fetchMe();
  }, [getMe, isAuth]);
};
