import type { Dispatch, SetStateAction } from "react";

import { EyeSlashFilledIcon } from "../assets/icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../assets/icons/EyeFilledIcon";

type PasswordViibilityButtonProps = {
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  isVisible: boolean;
};

export const PasswordViibilityButton = ({
  isVisible,
  setIsVisible,
}: PasswordViibilityButtonProps) => {
  return (
    <button
      className="focus:outline-none"
      type="button"
      onClick={() => setIsVisible((v) => !v)}
    >
      {isVisible ? (
        <EyeSlashFilledIcon className="text-2xl text-primary pointer-events-none" />
      ) : (
        <EyeFilledIcon className="text-2xl text-primary pointer-events-none" />
      )}
    </button>
  );
};
