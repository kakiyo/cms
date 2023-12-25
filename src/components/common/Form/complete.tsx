import { Button, Stack, Typography } from "@mui/material";
import { FC } from "react";

// どちらか一歩の型は必須
type ModalType =
  | {
      closeModal: () => void;
      changeModal?: never;
    }
  | {
      changeModal: () => void;
      closeModal?: never;
    };

type Props = {
  text: "登録" | "削除" | "更新";
} & ModalType;

export const MutateComplete: FC<Props> = (props) => {
  const { text, closeModal, changeModal } = props;
  const isChange = !!changeModal;

  return (
    <Stack
      display="flex"
      width="100%"
      height="100%"
      alignItems="center"
      spacing={4}
      justifyContent="center"
    >
      <Typography variant="h5" component="h1">
        {text}が完了しました
      </Typography>
      <Button
        variant="outlined"
        onClick={isChange ? changeModal : closeModal}
        size="large"
      >
        {isChange ? "戻る" : "閉じる"}
      </Button>
    </Stack>
  );
};
