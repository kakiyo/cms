import { Box, CircularProgress, CircularProgressProps } from "@mui/material";
import React from "react";

export const Loading: React.FC<CircularProgressProps> = (props) => {
  return (
    <Box
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress {...props} />
    </Box>
  );
};

export const PageLoading = () => {
  return (
    <Box
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
};
