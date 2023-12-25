import { Stack } from "@mui/material";
import { FC, useCallback } from "react";
import { LabelValueItem } from "../../common/LabelValueItem";
import {
  couponEditIncludePinSchema,
  couponEditRemovePinSchema,
} from "../Schema/couponEditSchema";
import { useCouponModalController } from "@/components/CouponPage/useCouponModalController";
import { FormGenerator } from "@/components/common/Form/FormGenerator";
import { MutateComplete } from "@/components/common/Form/complete";
import { MutateError } from "@/components/common/Form/error";
import { Loading } from "@/components/common/Loading";
import { useExclusiveMutationGen } from "@/hooks/useFormMutationGen";
import { useQueryGen } from "@/hooks/useQueryGen";
import { useModalSetter } from "@/store/modal";
import { Coupon, CouponApi } from "@/types/couponApi";
import { dateFormatString } from "@/utils/date/dateFormatString";
import { createApiPath } from "@/utils/url/createApiPath";

export const CouponEdit: FC<{ id: number }> = ({ id }) => {
  const { setDetailModal } = useCouponModalController();
  const { closeModal } = useModalSetter();
  const detailApiPath = createApiPath(`/coupon/${id}`);
  //データの最新であることを担保するため、改めてデータ取得する
  const { data, isLoading, isError } = useQueryGen<CouponApi>(
    detailApiPath,
    {},
    { cacheTime: 0, keepPreviousData: false }
  );
  const updateApiPath = createApiPath(`/coupon/${data?.id}/update`);
  const { exclusiveMutate: updateMutation } = useExclusiveMutationGen(
    updateApiPath,
    {
      curUpdated: data?.updated || "",
      apiPath: detailApiPath,
    }
  );
  const existDlList = !!data?.csv_dl_list.length;
  const schema = existDlList
    ? couponEditRemovePinSchema
    : couponEditIncludePinSchema;

  const onClickBack = useCallback(() => {
    if (data) {
      setDetailModal({
        id: data.id,
      });
    }
  }, [data, setDetailModal]);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <></>;
  }

  return (
    <FormGenerator<Coupon>
      schema={schema}
      mutation={updateMutation}
      defaultData={data}
      goBackFunc={onClickBack}
      CompleteView={<MutateComplete text="更新" closeModal={closeModal} />}
      ErrorView={<MutateError text="更新" closeModal={closeModal} />}
    >
      <Stack spacing={2} padding={1} mt={1}>
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
      </Stack>
    </FormGenerator>
  );
};
