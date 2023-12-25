import { Button } from "@mui/material";
import { forwardRef, ReactNode } from "react";

export const ScrollContainer = forwardRef<
  HTMLDivElement,
  { children: ReactNode; scrollToTop?: () => void }
>(function ScrollContainer(props, ref) {
  return (
    <div
      style={{ overflowY: "auto", height: "100%", width: "100%", padding: 8 }}
      ref={ref}
    >
      {props.children}
      {props.scrollToTop && (
        <Button
          sx={{
            position: "absolute",
            bottom: "36px",
            right: "36px",
            width: "80px",
            height: "40px",
          }}
          onClick={props.scrollToTop}
          variant="outlined"
        >
          TOP ↑
        </Button>
      )}
    </div>
  );
});
