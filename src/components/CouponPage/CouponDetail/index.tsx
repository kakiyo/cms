import { Button, Grid, Paper, Stack, useMediaQuery } from "@mui/material";
import { FC, useCallback } from "react";
import { CmsIconButton } from "../../common/Button/CmsIconButton";
import { FormGenerator } from "../../common/Form/FormGenerator";
import { LabelValueItem } from "../../common/LabelValueItem";
import { detailSchema } from "../Schema/couponDetailSchema";
import { CouponDLHistory } from "./CouponDLHistory";
import { useCouponModalController } from "@/components/CouponPage/useCouponModalController";
import { WithErrorMessage } from "@/components/common/HelperText/ErrorMessage";
import { Loading } from "@/components/common/Loading";
import { ScrollContainer } from "@/components/common/ScrollContainer";
import { useQueryGen } from "@/hooks/useQueryGen";
import { useGetAuthState } from "@/store/auth";
import { useModalSetter } from "@/store/modal";
import { Coupon, CouponApi } from "@/types/couponApi";
import { userRoleMap } from "@/types/user";
import { dateFormatString } from "@/utils/date/dateFormatString";
import { createApiPath } from "@/utils/url/createApiPath";

export const CouponDetail: FC<{ id: number }> = ({ id }) => {
  const detailApiPath = createApiPath(`/coupon/${id}`);
  const { data, isLoading, isError } = useQueryGen<CouponApi>(
    detailApiPath,
    {},
    { cacheTime: 0 }
  );
  const { closeModal } = useModalSetter();
  const { setEditModal, setDeleteModal } = useCouponModalController();
  const user = useGetAuthState();
  const role = user?.role;
  const isSmallWindow = !useMediaQuery("(min-width:1300px)");

  const isRead = role === userRoleMap.read;
  const isRegisterWaiting = data?.regist_status === 0;
  const isRegistering = data?.regist_status === 1;
  const isRegisterError = data?.regist_status === 3;
  const csvDlDisabled = isRegisterError || isRegisterWaiting || isRegistering;
  const roleError = {
    message: "権限がありません",
    isError: isRead,
  };
  const registerErrors = [
    {
      message: "入稿処理の開始待ちです",
      isError: isRegisterWaiting,
    },
    {
      message: "入稿処理中です。しばらくお待ちください。",
      isError: isRegistering,
    },
    {
      message: "PINファイルの登録に失敗しました。\n再登録をしてください。",
      isError: isRegisterError,
    },
  ];

  const onEditClick = useCallback(() => {
    if (data) {
      setEditModal({ id: data.id });
    }
  }, [data, setEditModal]);
  const onDeleteClick = useCallback(() => {
    if (data) {
      setDeleteModal({
        id: data.id,
        chain_store_name: data.chain_store_name,
        coupon_text: data.coupon_text,
      });
    }
  }, [data, setDeleteModal]);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <></>;
  }

  return (
    <ScrollContainer>
      <Stack direction="column" spacing={2} margin={1}>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <Paper elevation={3}>
              <FormGenerator<Coupon>
                schema={detailSchema}
                readOnly
                defaultData={data}
              />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <CouponDLHistory csvDlList={data.csv_dl_list} />
          </Grid>
        </Grid>
        <Stack spacing={2} padding={1}>
          <LabelValueItem
            label="作成日時・作成者"
            value={`${dateFormatString(data.created, "YYYY/MM/DD HH:mm:ss")} ${
              data.created_by_name
            } ${data.created_by_mail}`}
          />
          <LabelValueItem
            label="更新日時・更新者"
            value={`${dateFormatString(data.updated, "YYYY/MM/DD HH:mm:ss")} ${
              data.updated_by_name
            } ${data.updated_by_mail}`}
          />
          <LabelValueItem
            label="登録クーポン件数"
            value={data.pin_count.toLocaleString()}
          />
          <LabelValueItem
            label="使用済みクーポン件数"
            value={data.used_count.toLocaleString()}
          />
        </Stack>
        <Grid container justifyContent="space-between" alignItems={"center"}>
          <Grid item xs={1}>
            <Button onClick={closeModal} variant="outlined">
              閉じる
            </Button>
          </Grid>
          <Grid item xs={2}>
            <WithErrorMessage errors={[roleError, ...registerErrors]}>
              <Button
                variant="contained"
                color="warning"
                style={{
                  fontSize: isSmallWindow ? 12 : "inherit",
                }}
                disabled={isRead || csvDlDisabled}
                href={createApiPath(`/url_list/${data.id}?verify=1`)}
              >
                検証用クーポンCSV DL
              </Button>
            </WithErrorMessage>
          </Grid>
          <Grid item xs={2}>
            <WithErrorMessage errors={[roleError, ...registerErrors]}>
              <Button
                variant="contained"
                color="warning"
                style={{ fontSize: isSmallWindow ? 12 : "inherit" }}
                disabled={isRead || csvDlDisabled}
                href={createApiPath(`/url_list/${data.id}?verify=0`)}
              >
                配信用クーポンCSV DL
              </Button>
            </WithErrorMessage>
          </Grid>
          <Grid item xs={2}>
            <WithErrorMessage errors={registerErrors}>
              <Button
                variant="contained"
                style={{ fontSize: isSmallWindow ? 12 : "inherit" }}
                disabled={csvDlDisabled}
                href={createApiPath(`/report/${data.id}`)}
              >
                レポートCSV DL
              </Button>
            </WithErrorMessage>
          </Grid>
          <Grid item xs={1}>
            <WithErrorMessage errors={[roleError]}>
              <CmsIconButton
                variant="edit"
                onClick={onEditClick}
                disabled={isRead}
              />
            </WithErrorMessage>
          </Grid>
          <Grid item xs={1}>
            <WithErrorMessage errors={[roleError]}>
              <Button
                variant="outlined"
                color="warning"
                disabled={isRead}
                onClick={onDeleteClick}
              >
                削除
              </Button>
            </WithErrorMessage>
          </Grid>
        </Grid>
      </Stack>
    </ScrollContainer>
  );
};
