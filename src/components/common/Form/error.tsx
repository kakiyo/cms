import { Box, Button, Stack, Typography } from "@mui/material";
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

export const MutateError: FC<Props> = (props) => {
  const { closeModal, changeModal, text } = props;
  const isChange = !!changeModal;

  return (
    <Stack
      height="100%"
      alignItems="center"
      justifyContent="center"
      spacing={3}
    >
      <Box textAlign="center">
        <Typography variant="h5" component="h1" color="error">
          {text}に失敗しました
        </Typography>
        <Typography variant="h5" component="h1">
          開発チームにお問い合わせをお願いします
        </Typography>
      </Box>
      <Button onClick={isChange ? changeModal : closeModal} variant="outlined">
        {isChange ? "戻る" : "閉じる"}
      </Button>
    </Stack>
  );
};
