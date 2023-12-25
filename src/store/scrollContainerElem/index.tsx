import { useCallback } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

type ScrollContainerElem = HTMLDivElement | null;
export const scrollContainerElemAtom = atom<ScrollContainerElem>({
  key: "SCROLL_CONTAINER_ELEM",
  default: null,
});

export const useScrollContainerElemSetter = () => {
  const setScrollContainerElemState = useSetRecoilState(
    scrollContainerElemAtom
  );

  const setScrollContainerElem = useCallback(
    (newVal: ScrollContainerElem) => {
      if (newVal) {
        setScrollContainerElemState(newVal);
      }
    },
    [setScrollContainerElemState]
  );

  return { setScrollContainerElem };
};

export const useGetScrollContainerElemState = () => {
  return useRecoilValue(scrollContainerElemAtom);
};
