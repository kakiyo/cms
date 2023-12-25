import React, { useCallback } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

type ModalState = {
  open: boolean;
  header?: React.ReactElement | string;
  contents: React.ReactElement;
};
export const modalStateAtom = atom<ModalState>({
  key: "MODAL_STATE",
  default: {
    open: false,
    header: <></>,
    contents: <></>,
  },
});

export const useModalSetter = () => {
  const setModalState = useSetRecoilState(modalStateAtom);

  const openModal = useCallback(() => {
    setModalState((currVal) => {
      return { ...currVal, open: true };
    });
  }, [setModalState]);
  const closeModal = useCallback(() => {
    setModalState((currVal) => {
      return { ...currVal, open: false };
    });
  }, [setModalState]);

  const setModalHeader = useCallback(
    (header: ModalState["header"]) => {
      setModalState((currVal) => {
        return { ...currVal, header };
      });
    },
    [setModalState]
  );

  const setModalContents = useCallback(
    (contents: ModalState["contents"]) => {
      setModalState((currVal) => {
        return { ...currVal, contents };
      });
    },
    [setModalState]
  );

  return {
    openModal,
    closeModal,
    setModalHeader,
    setModalContents,
  };
};

export const useGetModalState = () => {
  return useRecoilValue(modalStateAtom);
};
