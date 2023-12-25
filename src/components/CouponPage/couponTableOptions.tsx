import {
  Filter1,
  Filter2,
  Filter3,
  Filter4,
  Filter5,
} from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { GridColDef } from "@mui/x-data-grid";
import { FC, ReactNode, useCallback, useState } from "react";
import { CmsIconButton } from "../common/Button/CmsIconButton";
import { WithErrorMessage } from "../common/HelperText/ErrorMessage";
import { ImageBackdrop } from "../common/ImageBackdrop";
import { useCouponModalController } from "./useCouponModalController";
import { insertCommonConfig } from "@/components/common/Table/insertCommnConfig";
import { useGetAuthState } from "@/store/auth";
import { useModalSetter } from "@/store/modal";
import { CouponListItem } from "@/types/couponApi";
import { UserInfo, userRoleMap } from "@/types/user";
import { dateFormatString } from "@/utils/date/dateFormatString";
import { dateOrStringToDate } from "@/utils/date/dateOrStringToDate";
import { getDateStatus } from "@/utils/date/getDateStatus";
import { getPlainText } from "@/utils/richText/getPlainText";

type Props = {
  setCurData: (data: CouponListItem | null) => void;
  curData: CouponListItem | null;
};

type GetColumns = (props: Props) => {
  ImageBackDrop: ReactNode;
  columns: GridColDef<CouponListItem>[];
};

export const useCouponColumns: GetColumns = ({ setCurData, curData }) => {
  const user = useGetAuthState();
  const [backDropState, setBackDropState] = useState(false);
  const openBackDrop = useCallback(() => setBackDropState(true), []);
  const closeBackDrop = useCallback(() => {
    setBackDropState(false);
    setCurData(null);
  }, [setCurData]);
  const theme = useTheme();

  if (!user) {
    return { ImageBackDrop: <></>, columns: [] };
  }

  return {
    ImageBackDrop: (
      <ImageBackdrop
        open={backDropState}
        closeBackDrop={closeBackDrop}
        imageArray={curData?.img_url_list ?? []}
      />
    ),
    columns: insertCommonConfig<CouponListItem>([
      {
        field: "campaign_id",
        headerName: "キャンペーンID",
        renderCell(params) {
          return <Typography>{params.row.campaign_id}</Typography>;
        },
      },
      {
        field: "status",
        headerName: "ステータス",
        renderCell: (param) => {
          const now = new Date();
          const status = param.row.status as number;
          const timeStatus = getDateStatus(
            now,
            dateOrStringToDate(param.row.started),
            dateOrStringToDate(param.row.ended)
          );
          const text = (() => {
            if (status === 0) {
              switch (timeStatus) {
                case "after":
                  return "利用期間終了";
                case "before":
                  return "公開中(利用期間前)";
                case "within":
                  return "公開中";
              }
            } else if (status === 1) {
              return "公開停止中";
            } else {
              return "削除済み";
            }
          })();
          const color = (() => {
            switch (text) {
              case "公開中":
                return theme.palette.couponStatus.open;
              case "公開中(利用期間前)":
                return theme.palette.couponStatus.open;
              case "公開停止中":
                return theme.palette.couponStatus.stop;
              case "利用期間終了":
                return theme.palette.couponStatus.end;
              case "削除済み":
                return theme.palette.couponStatus.deleted;
            }
          })();
          return (
            <Typography my="auto" color={color}>
              {text}
            </Typography>
          );
        },
      },
      {
        field: "chain_store_name",
        renderHeader: () => (
          <Stack textAlign="center" width="100%">
            <Typography px={1} borderBottom="2px solid" fontSize="14px">
              チェーン店名
            </Typography>
            <Typography
              fontSize="14px"
              width="100%"
              textOverflow="ellipsis"
              overflow="hidden"
            >
              クーポン画像下テキスト
            </Typography>
          </Stack>
        ),
        renderCell: (params) => (
          <Stack spacing={1} textAlign="center" width="100%">
            <Typography>{params.row.chain_store_name}</Typography>
            <Typography
              borderTop="2px solid"
              px={1}
              overflow="hidden"
              textOverflow="ellipsis"
              width="100%"
            >
              {getPlainText(params.row.coupon_text)}
            </Typography>
          </Stack>
        ),
      },
      {
        field: "img_url_list",
        headerName: "クーポン画像",
        renderCell: (param) => (
          <CouponClickableImage
            rowData={param.row}
            setCurData={setCurData}
            openBackDrop={openBackDrop}
          />
        ),
      },
      {
        field: "usagePeriod",
        headerName: "利用可能期間",
        renderCell: (param) => {
          return (
            <Stack>
              <Typography>
                {dateFormatString(param.row.started, "YYYY/MM/DD HH:mm:ss")}
              </Typography>
              <Typography>
                {dateFormatString(param.row.ended, "YYYY/MM/DD HH:mm:ss")}
              </Typography>
            </Stack>
          );
        },
      },
      {
        field: "pin_count",
        renderHeader: () => (
          <Stack width="100%" textAlign="center">
            <Typography
              px={1}
              borderBottom="2px solid"
              fontSize="14px"
              width="100%"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              使用済みクーポン件数
            </Typography>
            <Typography fontSize="14px">登録クーポン件数</Typography>
          </Stack>
        ),
        renderCell: (param) => (
          <Stack width={param.colDef.computedWidth}>
            <Box mx="auto">
              <Typography align="center" width="100%">
                {Number(param.row.used_count).toLocaleString()}
              </Typography>
              <Typography
                align="center"
                borderTop="2px solid"
                width="fit-content"
                px={1}
              >
                {Number(param.row.pin_count).toLocaleString()}
              </Typography>
            </Box>
          </Stack>
        ),
      },
      {
        field: "button",
        headerName: "詳細確認・複製",
        renderCell: (param) => {
          return (
            <CouponTableActions
              rowData={param.row}
              role={user.role}
              status={param.row.status}
            />
          );
        },
      },
    ]),
  };
};
const CouponClickableImage: FC<{
  openBackDrop: () => void;
  setCurData: Props["setCurData"];
  rowData: CouponListItem;
}> = ({ openBackDrop, rowData, setCurData }) => {
  const onClickImage = useCallback(() => {
    openBackDrop();
    setCurData(rowData);
  }, [openBackDrop, rowData, setCurData]);

  return (
    <Stack
      display="flex"
      position="relative"
      sx={{
        cursor: "pointer",
        textAlign: "center",
        height: "100%",
        width: "100%",
      }}
      onClick={onClickImage}
    >
      <img
        src={rowData.img_url_list[0]}
        alt="coupon image"
        height="100%"
        width="100%"
        style={{ objectFit: "contain" }}
      />
      <Box
        sx={{
          position: "absolute",
          background: "white",
          display: "flex",
          right: "4px",
          top: "4px",
        }}
      >
        {(() => {
          switch (rowData.img_url_list.length) {
            case 1:
              return <Filter1 color="primary" />;
            case 2:
              return <Filter2 color="primary" />;
            case 3:
              return <Filter3 color="primary" />;
            case 4:
              return <Filter4 color="primary" />;
            case 5:
              return <Filter5 color="primary" />;
          }
        })()}
      </Box>
    </Stack>
  );
};
const CouponTableActions: FC<{
  rowData: CouponListItem;
  role: UserInfo["role"];
  status: number;
}> = ({ rowData, role, status }) => {
  const { openModal } = useModalSetter();
  const { setCopyModal, setDetailModal } = useCouponModalController();
  const onClickDetail = useCallback(() => {
    setDetailModal({ id: rowData.id });
    openModal();
  }, [openModal, rowData, setDetailModal]);
  const onClickCopy = useCallback(() => {
    setCopyModal({ id: rowData.id });
    openModal();
  }, [openModal, rowData, setCopyModal]);
  return (
    <WithErrorMessage
      errors={[
        {
          message: "権限がありません",
          isError: role === userRoleMap.read,
        },
        { message: "削除済みです", isError: status === 2 },
      ]}
    >
      <Stack direction="row">
        <CmsIconButton
          variant="detail"
          onClick={onClickDetail}
          disabled={rowData.status == 2}
        />
        <CmsIconButton
          variant="copy"
          onClick={onClickCopy}
          disabled={role === userRoleMap.read}
        />
      </Stack>
    </WithErrorMessage>
  );
};
