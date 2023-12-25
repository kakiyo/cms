import { ErrorMessage } from "@hookform/error-message";
import { Typography, useTheme } from "@mui/material";
import { ComponentProps, FC, useCallback } from "react";
import { MultipleFieldErrors } from "react-hook-form";

type Props = ComponentProps<typeof ErrorMessage>;

export const RHFErrorMessage: FC<Props> = (props) => {
  const theme = useTheme();

  type Data = { message: string; messages?: MultipleFieldErrors | undefined };
  const render = useCallback(
    (data: Data) => {
      return (
        <Typography
          color={theme.palette.error.main}
          sx={{
            "::before": {
              display: "inline",
              content: "'⚠ '",
            },
          }}
          variant="body1"
        >
          {data.message}
        </Typography>
      );
    },
    [theme.palette.error.main]
  );

  return <ErrorMessage {...props} render={render} />;
};
