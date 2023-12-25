import { ComponentProps, useCallback } from "react";
import { CouponCopy } from "./CouponCopy";
import { CouponCreate } from "./CouponCreate";
import { CouponDelete } from "./CouponDelete";
import { CouponDetail } from "./CouponDetail";
import { CouponEdit } from "./CouponEdit";
import { useModalSetter } from "@/store/modal";

export const useCouponModalController = () => {
  const { setModalHeader, setModalContents } = useModalSetter();

  const setCreateModal = useCallback(() => {
    setModalHeader("クーポン新規登録");
    setModalContents(<CouponCreate />);
  }, [setModalContents, setModalHeader]);

  const setEditModal = useCallback(
    (props: ComponentProps<typeof CouponEdit>) => {
      setModalHeader("クーポン編集");
      setModalContents(<CouponEdit {...props} />);
    },
    [setModalContents, setModalHeader]
  );

  const setDeleteModal = useCallback(
    (props: ComponentProps<typeof CouponDelete>) => {
      setModalHeader("登録クーポン削除");
      setModalContents(<CouponDelete {...props} />);
    },
    [setModalContents, setModalHeader]
  );

  const setCopyModal = useCallback(
    (props: ComponentProps<typeof CouponCopy>) => {
      setModalHeader("クーポン新規登録");
      setModalContents(<CouponCopy {...props} />);
    },
    [setModalContents, setModalHeader]
  );

  const setDetailModal = useCallback(
    (props: ComponentProps<typeof CouponDetail>) => {
      setModalHeader("クーポン詳細情報");
      setModalContents(<CouponDetail {...props} />);
    },
    [setModalContents, setModalHeader]
  );

  return {
    setCreateModal,
    setEditModal,
    setDetailModal,
    setCopyModal,
    setDeleteModal,
  };
};
