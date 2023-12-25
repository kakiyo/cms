import { LocalizationProvider, jaJP } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { FC, ReactNode } from "react";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

type Props = {
  children: ReactNode;
};

export const DateProvider: FC<Props> = (props) => {
  const { children } = props;
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale="ja"
      localeText={
        jaJP.components.MuiLocalizationProvider.defaultProps.localeText
      }
    >
      {children}
    </LocalizationProvider>
  );
};
