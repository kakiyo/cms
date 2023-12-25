import { FC } from "react";
import { couponSchema } from "@/components/CouponPage/Schema/couponSchema";
import { FormGenerator } from "@/components/common/Form/FormGenerator";
import { MutateComplete } from "@/components/common/Form/complete";
import { MutateError } from "@/components/common/Form/error";
import { Loading } from "@/components/common/Loading";
import { useFormMutationGen } from "@/hooks/useFormMutationGen";
import { useQueryGen } from "@/hooks/useQueryGen";
import { useModalSetter } from "@/store/modal";
import { CouponApi, Coupon } from "@/types/couponApi";
import { deleteElementOfObject } from "@/utils/object/deleteElementOfObject";
import { createApiPath } from "@/utils/url/createApiPath";

export const CouponCopy: FC<{ id: number }> = ({ id }) => {
  const detailApiPath = createApiPath(`/coupon/${id}`);
  const apiPathOfCreate = createApiPath("/coupon/create");
  const { mutateAsync: createMutation } = useFormMutationGen(apiPathOfCreate);
  const { closeModal } = useModalSetter();

  const { data, isLoading, isError } = useQueryGen<CouponApi>(
    detailApiPath,
    {},
    { cacheTime: 0, keepPreviousData: false }
  );

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <></>;
  }
  const initialData = {
    ...deleteElementOfObject(data, [
      "coupon_img_1",
      "coupon_img_2",
      "coupon_img_3",
      "coupon_img_4",
      "coupon_img_5",
      "campaign_id",
    ]),
    status: 0,
  };

  return (
    <FormGenerator<Coupon>
      schema={couponSchema}
      mutation={createMutation}
      defaultData={initialData}
      CompleteView={<MutateComplete text="登録" closeModal={closeModal} />}
      ErrorView={<MutateError text="登録" closeModal={closeModal} />}
      goBackFunc={closeModal}
    />
  );
};
