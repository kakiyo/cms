import { Stack, Typography } from "@mui/material";
import { FC } from "react";

type Props = {
  label: string;
  value: string;
  labelWidth?: number;
};

export const LabelValueItem: FC<Props> = (props) => {
  const { label, value, labelWidth = 200 } = props;
  return (
    <Stack direction="row">
      <Typography width={labelWidth} flexShrink={0}>
        {label}
      </Typography>
      <Typography>{value}</Typography>
    </Stack>
  );
};
