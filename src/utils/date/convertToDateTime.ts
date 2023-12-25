import dayjs from "dayjs";

export function convertToDatetime(date: string | Date) {
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
}
