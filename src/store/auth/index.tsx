import { useCallback } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { UserInfo } from "@/types/user";

export const authAtom = atom<UserInfo | null>({
  key: "AUTH",
  default: null,
});

export const useAuthSetter = () => {
  const setAuthState = useSetRecoilState(authAtom);

  const setUser = useCallback(
    (user: UserInfo) => {
      setAuthState(user);
    },
    [setAuthState]
  );

  const clearUser = useCallback(() => {
    setAuthState(null);
  }, [setAuthState]);

  return {
    setUser,
    clearUser,
  };
};

export const useGetAuthState = () => {
  return useRecoilValue(authAtom);
};
