import { useRouter } from "next/router";
import { FC, ReactNode, useEffect } from "react";
import { LoginPageView } from "@/components/LoginPage/LoginPageView";
import { RoleNoticeView } from "@/components/RoleNoticePage";
import { PageLoading } from "@/components/common/Loading";
import { useQueryGen } from "@/hooks/useQueryGen";
import { useGetApiError } from "@/store/apiError";
import { useAuthSetter } from "@/store/auth";
import { UserInfoApi } from "@/types/user";
import { errorCode } from "@/utils/apiError/getApiError";
import { createApiPath } from "@/utils/url/createApiPath";

type Props = {
  children: ReactNode;
};

export const LoginGuardProvider: FC<Props> = (props) => {
  const { children } = props;
  const { setUser, clearUser } = useAuthSetter();
  const apiErrors = useGetApiError();
  const { data, error, isLoading } = useQueryGen<UserInfoApi>(
    createApiPath("/user/info")
  );
  const isWindowUndefined = typeof window === "undefined";
  const router = useRouter();
  const redirectTo = !isWindowUndefined
    ? sessionStorage.getItem("redirectTo")
    : "";
  const asPath = router.asPath;

  useEffect(() => {
    // APIレスのユーザー情報をStoreに同期させ
    if (data) {
      setUser(data);
    } else {
      clearUser();
    }
  }, [clearUser, data, setUser]);

  if (isLoading) {
    return <PageLoading />;
  }

  //ユーザ情報取得エラーの場合Loginページ表示
  if (error || apiErrors.indexOf(errorCode["AUTH_ERR"]) > -1) {
    // ルート以外へのアクセスがあればパスを保存して認証確認後に保存したパスへ遷移
    if (asPath !== "/" && !isWindowUndefined) {
      sessionStorage.setItem("redirectTo", router.asPath);
    }
    return <LoginPageView />;
  }

  //ユーザが新規ユーザの場合、ロール提示画面を表示
  if (data?.role === "new") {
    return <RoleNoticeView />;
  }

  if (redirectTo && !isWindowUndefined) {
    sessionStorage.removeItem("redirectTo");
    router.push(redirectTo);
  }

  //ログイン済み & ログインページ & ロール提示画面の場合
  //画面内容を表示(ディフォルトホーム画面)
  return <>{children}</>;
};
