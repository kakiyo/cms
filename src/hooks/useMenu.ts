import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import PersonIcon from "@mui/icons-material/Person";
import { useRouter } from "next/router";
import { useMemo } from "react";

export const menu = [
  { name: "ユーザー管理", path: "/user", icon: PersonIcon },
  { name: "クーポン登録", path: "/coupon", icon: ConfirmationNumberIcon },
];

export const useMenu = () => {
  const router = useRouter();
  const name = useMemo(() => {
    const filteredPathName = menu.filter(
      (item) => item.path === router.pathname
    )[0];
    return filteredPathName?.name ?? "SYSTEM";
  }, [router.pathname]);

  return { name };
};
