import dayjs from "dayjs";
import { dateOrStringToDate } from "./dateOrStringToDate";

type DateFormat =
  // 2022/10/23
  | "YYYY/MM/DD"
  // 2022/10/23
  | "YYYY/MM/DD"
  // 2022/10/23 10:10
  | "YYYY/MM/DD HH:mm"
  // 2022/10/23 10:10:01
  | "YYYY/MM/DD HH:mm:ss";

export const dateFormatString = (
  dateProps: string | Date,
  dateFormatEnum: DateFormat
) => {
  const date = dateOrStringToDate(dateProps);
  return dayjs(date).format(dateFormatEnum);
};
