import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import { FC } from "react";
import NoticeMessage from "./NoticeMessage";
import { useLogin } from "@/hooks/useLogin";
import { useGetAuthState } from "@/store/auth";

export const RoleNoticeView: FC = () => {
  const { logout } = useLogin();
  const user = useGetAuthState();

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Card elevation={0}>
        <CardHeader
          title={
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={1}
            >
              <Avatar src="SYSTEM.png" />
              <Typography variant="h4" fontWeight="600" color="primary">
                UNI
              </Typography>
            </Stack>
          }
        />

        <CardContent>
          <Typography variant="h4" mb={2}>
            ようこそ {user?.name} さん
          </Typography>
          <Alert severity="error" variant="outlined">
            <AlertTitle>
              <b>権限が必要です。</b>
            </AlertTitle>
            <Typography>SYSTEMの管理者にお問い合わせしてください。</Typography>
            <br />
            <NoticeMessage />
          </Alert>
        </CardContent>
        <CardContent>
          <Alert severity="warning" variant="outlined">
            <AlertTitle>
              権限付与されたら一回<b>ログアウト</b>してください。
            </AlertTitle>
            サーバに権限付与前の認証データが残っている場合、
            <br />
            正常に動作しない可能性があります。
          </Alert>
        </CardContent>
        <CardActions disableSpacing style={{ padding: 0 }}>
          <Box p={2} display="flex" width="100%" flexDirection="column">
            <Button variant="contained" onClick={logout} fullWidth>
              ログアウト
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};
