import { Box, Snackbar } from "@mui/material";
import { useRouter } from "next/router";
import { FC } from "react";
import { ErrorStack } from "./ErrorStack";

export const ApiErrorPopup: FC = () => {
  const router = useRouter();
  if (router.pathname === "/login") {
    return <></>;
  }
  return (
    <>
      <Snackbar
        open={true}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        {/* エラー回避のためのBox https://github.com/mui/material-ui/issues/28918*/}
        <Box>
          <ErrorStack />
        </Box>
      </Snackbar>
    </>
  );
};
