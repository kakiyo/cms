import { Grid, Typography, useTheme } from "@mui/material";
import { FC, ReactNode } from "react";

export type ErrorObject = {
  message: string;
  isError: boolean;
};

type Props = {
  children: ReactNode;
  errors: ErrorObject[];
};

export const WithErrorMessage: FC<Props> = (props) => {
  const { children, errors } = props;
  const theme = useTheme();
  const visibleError = errors.filter((item) => item.isError)[0];

  return (
    <Grid container>
      <Grid container justifyContent={"center"}>
        {children}
      </Grid>
      <Grid container justifyContent={"center"}>
        {visibleError && (
          <Typography
            color={theme.palette.error.main}
            sx={{
              "::before": {
                display: "inline",
                content: "'⚠ '",
              },
            }}
            fontSize="8px"
            variant="body1"
            whiteSpace="pre-wrap"
            textAlign="center"
          >
            {visibleError.message}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};
