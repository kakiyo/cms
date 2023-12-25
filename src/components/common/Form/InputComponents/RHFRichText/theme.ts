import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles(
  createStyles({
    link: {
      textDecoration: "none",
      color: "#0099FF",
      "&:hover": {
        textDecoration: "underline",
        cursor: "pointer",
      },
    },
    root: {
      padding: "0 14px",
    },
  })
);
