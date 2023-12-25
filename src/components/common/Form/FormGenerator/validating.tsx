import { CircularProgress, Stack, Typography } from "@mui/material";
import { FC } from "react";

export const Validating: FC = () => (
  <Stack alignItems="center" direction="row" spacing={1}>
    <Typography variant="body1">バリデーション中</Typography>
    <CircularProgress size={16} sx={{ display: "block" }} />
  </Stack>
);
