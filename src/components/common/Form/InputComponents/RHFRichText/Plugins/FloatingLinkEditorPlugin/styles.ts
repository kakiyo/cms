import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles(
  createStyles({
    linkEditor: {
      display: "flex",
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 100,
      maxWidth: "400px",
      width: "100%",
      opacity: 0,
      backgroundColor: "#fff",
      boxShadow: "0 5px 10px rgba(0, 0, 0, 0.3)",
      borderDadius: "0 0 8px 8px",
      transition: "opacity 0.5s",
      willChange: "transform",
    },
    linkInput: {
      display: "block",
      width: "calc(100% - 75px)",
      boxSizing: "border-box",
      margin: "12px 12px",
      padding: "8px 12px",
      borderRadius: "15px",
      backgroundColor: "#eee",
      fontSize: "15px",
      color: "rgb(5, 5, 5)",
      border: 0,
      outline: 0,
      position: "relative",
      fontFamily: "inherit",
    },
    linkEditorButton: {
      width: "20px",
      height: "20px",
      display: "inlineBlock",
      padding: "6px",
      borderRadius: "8px",
      cursor: "pointer",
      margin: "0 2px",
      "$:hovered": {
        width: "20px",
        height: "20px",
        display: "inlineBlock",
        backgroundColor: "#eee",
      },
    },

    linkEditorButtonIActionsI: {
      backgroundSize: "contain",
      display: "inlineBlock",
      height: "20px",
      width: "20px",
      verticalAlign: "-0.25em",
    },
    linkView: {
      display: "block",
      width: "calc(100% - 24px)",
      margin: "8px 12px",
      padding: "8px 12px",
      borderRadius: "15px",
      fontSize: "15px",
      color: "rgb(5, 5, 5)",
      border: 0,
      outline: 0,
      position: "relative",
      fontFamily: "inherit",
    },
  })
);
