import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useCallback } from "react";
import { LabelValueItem } from "../../common/LabelValueItem";
import { useCouponModalController } from "../useCouponModalController";
import { MutateComplete } from "@/components/common/Form/complete";
import { MutateError } from "@/components/common/Form/error";
import { useFormMutationGen } from "@/hooks/useFormMutationGen";
import { useModalSetter } from "@/store/modal";
import { Coupon } from "@/types/couponApi";
import { getPlainText } from "@/utils/richText/getPlainText";
import { createApiPath } from "@/utils/url/createApiPath";

export const CouponDelete: FC<
  Pick<Coupon, "chain_store_name" | "coupon_text" | "id">
> = ({ chain_store_name, coupon_text, id }) => {
  const { setDetailModal } = useCouponModalController();
  const { closeModal } = useModalSetter();
  const deleteCouponMutate = useFormMutationGen(
    createApiPath(`/coupon/${id}/delete`)
  );
  const onClickDelete = useCallback(() => {
    deleteCouponMutate.mutate({});
  }, [deleteCouponMutate]);
  const deleteMode = deleteCouponMutate.isSuccess
    ? "success"
    : deleteCouponMutate.isError
    ? "failed"
    : "confirm";
  const goDetail = useCallback(() => {
    setDetailModal({ id });
  }, [id, setDetailModal]);

  const modalContents = {
    confirm: (
      <>
        <Stack spacing={3}>
          <Box>
            <Typography variant="h6" component="h1">
              以下のクーポンを削除してよろしいですか
            </Typography>
            <Typography variant="h6" component="h1" color="error">
              削除には30分程度時間がかかる場合があります
            </Typography>
          </Box>
          <Stack spacing={2}>
            <LabelValueItem
              labelWidth={200}
              label="チェーン店名"
              value={chain_store_name}
            />
            <LabelValueItem
              labelWidth={200}
              label="クーポン画像下テキスト"
              value={getPlainText(coupon_text)}
            />
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            spacing={6}
            width="100%"
          >
            <Button
              variant="contained"
              onClick={onClickDelete}
              disabled={deleteCouponMutate.isLoading}
            >
              削除
            </Button>
            <Button
              variant="outlined"
              onClick={goDetail}
              disabled={deleteCouponMutate.isLoading}
            >
              キャンセル
            </Button>
          </Stack>
        </Stack>
        {deleteCouponMutate.isLoading && (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={deleteCouponMutate.isLoading}
          >
            <Typography variant="h6" component="h1">
              削除中です。少々お待ちください。
            </Typography>
            <CircularProgress color="inherit" size="18px" />
          </Backdrop>
        )}
      </>
    ),
    success: <MutateComplete closeModal={closeModal} text="削除" />,
    failed: <MutateError changeModal={goDetail} text="削除" />,
  };

  return (
    <Stack
      alignItems="center"
      height="100%"
      justifyContent="center"
      spacing={2}
    >
      {modalContents[deleteMode]}
    </Stack>
  );
};
