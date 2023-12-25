import { Typography } from "@mui/material";
import { FC } from "react";

type Props = {
  text: string;
};

export const RHFTextFieldConfirm: FC<Props> = (props) => {
  const { text } = props;
  return <Typography m="auto 0">{text}</Typography>;
};
