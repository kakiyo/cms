import { useCallback } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { ErrorCode } from "@/utils/apiError/getApiError";

export const apiErrorAtom = atom<ErrorCode[]>({
  key: "API_ERROR",
  default: [],
});

export const useApiErrorSetter = () => {
  const setApiErrorState = useSetRecoilState(apiErrorAtom);

  const clearErrors = useCallback(() => {
    setApiErrorState([]);
  }, [setApiErrorState]);

  const addError = useCallback(
    (code: ErrorCode) => {
      // 重複を許さない
      setApiErrorState((currVal) => Array.from(new Set([...currVal, code])));
    },
    [setApiErrorState]
  );

  const removeError = useCallback(
    (index: number) =>
      setApiErrorState((currVal) => {
        if (currVal.length < index) {
          return currVal;
        }
        return [...currVal.slice(0, index), ...currVal.slice(index + 1)];
      }),
    [setApiErrorState]
  );

  return {
    clearErrors,
    addError,
    removeError,
  };
};

export const useGetApiError = () => {
  return useRecoilValue(apiErrorAtom);
};
