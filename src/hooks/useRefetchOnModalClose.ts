import { useEffect, useState } from "react";
import { useGetModalState } from "@/store/modal";

export const useRefetchOnModalClose = (refetch: () => void) => {
  const { open } = useGetModalState();
  const [hasOpen, setHasOpen] = useState(false);
  const isReadyToRefetch = hasOpen && !open;
  useEffect(() => {
    if (open) {
      setHasOpen(true);
    }
  }, [open]);

  //モーダル開いて閉じたらテーブルの再取得を行う
  if (isReadyToRefetch) {
    setHasOpen(false);
    refetch();
  }
};
