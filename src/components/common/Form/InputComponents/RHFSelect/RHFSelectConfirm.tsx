import { Typography } from "@mui/material";
import { FC } from "react";

type Props = {
  text: string;
  color?: string;
};

export const RHFSelectConfirm: FC<Props> = (props) => {
  const { text, color } = props;
  return (
    <Typography m="auto 0" color={color}>
      {text}
    </Typography>
  );
};
