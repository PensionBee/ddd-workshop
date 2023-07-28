import { useEffect } from "react";
import { useLockedBody } from "usehooks-ts";

type ToggleLockedBodyOptions = {
  disabled?: boolean;
};

export const useToggleLockedBody = (
  isLocked: boolean,
  { disabled }: ToggleLockedBodyOptions
) => {
  const [locked, setLocked] = useLockedBody();

  useEffect(() => {
    if (disabled) return setLocked(false);
    if (isLocked) return setLocked(true);
    return setLocked(false);
  }, [isLocked, disabled, setLocked]);

  return [locked];
};
