import { type ForwardedRef, useRef, useEffect } from "react";

export const useForwardRef = <RefType,>(
  ref: ForwardedRef<RefType>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialValue: any = null
) => {
  const targetRef = useRef<RefType>(initialValue);

  useEffect(() => {
    if (!ref) return;
    if (typeof ref === "function") {
      ref(targetRef.current);
    } else {
      ref.current = targetRef.current;
    }
  }, [ref]);

  return targetRef;
};
