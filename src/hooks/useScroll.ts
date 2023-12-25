import { useCallback, useRef } from "react";

export const useScroll = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const scrollToTop = useCallback(() => {
    ref.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [ref]);

  return {
    ref,
    scrollToTop,
  };
};
