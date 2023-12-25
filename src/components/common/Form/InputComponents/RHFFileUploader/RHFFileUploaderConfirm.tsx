import { Typography } from "@mui/material";
import { FC } from "react";

type Props = {
  fileName: string | undefined;
};

export const RHFFileUploaderConfirm: FC<Props> = (props) => {
  const { fileName } = props;

  if (typeof fileName === "undefined") {
    return <></>;
  }

  return <Typography m="auto 0">{fileName}</Typography>;
};
