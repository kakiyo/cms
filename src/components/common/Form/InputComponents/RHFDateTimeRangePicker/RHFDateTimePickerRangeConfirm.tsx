import { Typography } from "@mui/material";
import { FC } from "react";
import { dateFormatString } from "@/utils/date/dateFormatString";

type Props = {
  dateStr: string;
};

export const RHFDateTimePickerRangeConfirm: FC<Props> = (props) => {
  const { dateStr } = props;

  return (
    <Typography m="auto 0" suppressHydrationWarning>
      {dateFormatString(dateStr, "YYYY/MM/DD HH:mm")}
    </Typography>
  );
};
