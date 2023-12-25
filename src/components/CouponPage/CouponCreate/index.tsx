import { FC } from "react";
import { couponSchema } from "../Schema/couponSchema";
import { FormGenerator } from "@/components/common/Form/FormGenerator";
import { MutateComplete } from "@/components/common/Form/complete";
import { MutateError } from "@/components/common/Form/error";
import { useFormMutationGen } from "@/hooks/useFormMutationGen";
import { useModalSetter } from "@/store/modal";
import { Coupon } from "@/types/couponApi";
import { createApiPath } from "@/utils/url/createApiPath";

export const CouponCreate: FC = () => {
  const { closeModal } = useModalSetter();
  const { mutateAsync } = useFormMutationGen(createApiPath("/coupon/create"));
  return (
    <FormGenerator<Coupon>
      schema={couponSchema}
      mutation={mutateAsync}
      CompleteView={<MutateComplete text="登録" closeModal={closeModal} />}
      ErrorView={<MutateError text="登録" closeModal={closeModal} />}
      goBackFunc={closeModal}
    />
  );
};
