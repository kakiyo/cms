import { useRouter } from "next/router";
import { useCallback } from "react";
import { createApiPath } from "@/utils/url/createApiPath";

export const useLogin = () => {
  const router = useRouter();
  const login = useCallback(() => {
    router.replace(createApiPath("login"));
  }, [router]);

  const logout = useCallback(() => {
    router.replace(createApiPath("logout"));
  }, [router]);

  return {
    login,
    logout,
  };
};
