import { ComponentProps, useCallback } from "react";
import { UserEdit } from "./UserEdit";
import { UserDelete } from "@/components/UserPage/UserDelete";
import { useModalSetter } from "@/store/modal";

export const useUserModalController = () => {
  const { setModalHeader, setModalContents } = useModalSetter();

  const setUserDelete = useCallback(
    (props: ComponentProps<typeof UserDelete>) => {
      setModalHeader("ユーザー削除");
      setModalContents(<UserDelete {...props} />);
    },
    [setModalContents, setModalHeader]
  );

  const setUserEdit = useCallback(
    (props: ComponentProps<typeof UserEdit>) => {
      setModalHeader("ユーザー編集");
      setModalContents(<UserEdit {...props} />);
    },
    [setModalContents, setModalHeader]
  );

  return {
    setUserDelete,
    setUserEdit,
  };
};
