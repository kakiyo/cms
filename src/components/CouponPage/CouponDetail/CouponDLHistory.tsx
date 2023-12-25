import { Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FC } from "react";
import { CouponDL } from "@/types/couponApi";
import { dateFormatString } from "@/utils/date/dateFormatString";

type Props = {
  csvDlList: CouponDL[];
};

export const CouponDLHistory: FC<Props> = (props) => {
  const { csvDlList } = props;

  return (
    <Paper elevation={3} sx={{ padding: 2, minHeight: 400 }}>
      <Stack direction="column" spacing={1}>
        <Typography variant="h4">クーポンCSV DL履歴</Typography>
        <Typography>最新の10件を表示</Typography>
        {csvDlList.map((item, index) => (
          <Box
            display="grid"
            gridTemplateColumns="50px 1fr"
            key={`csv dl history ${index}`}
          >
            <Typography color="red" width={50}>
              {index === 0 ? "New" : ""}
            </Typography>
            <Stack>
              <Typography variant="body1">
                {dateFormatString(item.dl_datetime, "YYYY/MM/DD HH:mm")}
              </Typography>
              <Typography variant="body1">
                {item.name}（{item.email}）
              </Typography>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
};
