import {
  Backdrop,
  Button,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { LabelValueItem } from "../../common/LabelValueItem";
import { MutateComplete } from "@/components/common/Form/complete";
import { MutateError } from "@/components/common/Form/error";
import { useFormMutationGen } from "@/hooks/useFormMutationGen";
import { useModalSetter } from "@/store/modal";
import { UserInfo } from "@/types/user";
import { createApiPath } from "@/utils/url/createApiPath";

type Props = {
  user: UserInfo;
};

export const UserDelete: FC<Props> = ({ user }) => {
  const { closeModal } = useModalSetter();
  const deleteApiPath = createApiPath(`user/${user.id}/delete`);
  const { mutate, isLoading, isSuccess, isError } =
    useFormMutationGen(deleteApiPath);

  const viewContents = {
    confirm: (
      <Grid
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        <Stack spacing={2}>
          <Typography variant="h6" component="h1">
            以下のユーザーを削除してよろしいですか
          </Typography>
          {user && (
            <>
              <LabelValueItem labelWidth={80} label="名前" value={user?.name} />
              <LabelValueItem
                labelWidth={80}
                label="メール"
                value={user?.email}
              />
            </>
          )}
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={mutate}>
              削除
            </Button>
            <Button onClick={closeModal}>キャンセル</Button>
          </Stack>
        </Stack>
      </Grid>
    ),
    error: <MutateError text="削除" closeModal={closeModal} />,
    complete: <MutateComplete text="削除" closeModal={closeModal} />,
  };

  const viewMode = isSuccess ? "complete" : isError ? "error" : "confirm";

  return (
    <>
      {viewContents[viewMode]}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body1">
            削除中です。少々お待ちください。
          </Typography>
          <CircularProgress color="inherit" size="16px" />
        </Stack>
      </Backdrop>
    </>
  );
};
