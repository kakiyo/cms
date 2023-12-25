import { Box } from "@mui/material";
import { Children, FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const CenteringGrid: FC<Props> = (props) => {
  const { children } = props;

  const countOfChildren = Children.count(children);
  const divisions =
    countOfChildren % 2 === 0 ? countOfChildren + 1 : countOfChildren;

  return (
    <Box
      display="grid"
      gridTemplateColumns={`repeat(${divisions}, 1fr)`}
      justifyItems="center"
    >
      {children}
    </Box>
  );
};
