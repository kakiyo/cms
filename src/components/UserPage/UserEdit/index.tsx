import { useQueryClient } from "@tanstack/react-query";
import { FC, useCallback } from "react";
import { userSchema } from "../Schema/userSchema";
import { FormGenerator } from "@/components/common/Form/FormGenerator";
import { MutateComplete } from "@/components/common/Form/complete";
import { MutateError } from "@/components/common/Form/error";
import { useFormMutationGen } from "@/hooks/useFormMutationGen";
import { useGetAuthState } from "@/store/auth";
import { useModalSetter } from "@/store/modal";
import { UserInfo } from "@/types/user";
import { createApiPath } from "@/utils/url/createApiPath";

type Props = {
  defaultData: UserInfo;
};

export const UserEdit: FC<Props> = (props) => {
  const { defaultData } = props;
  const { closeModal } = useModalSetter();
  const updateApiPath = createApiPath(`user/${defaultData.id}/update`);

  const loginUser = useGetAuthState();
  const queryClient = useQueryClient();
  const refetchUserInfo = useCallback(() => {
    if (loginUser?.email === defaultData?.email) {
      queryClient.refetchQueries({
        queryKey: [createApiPath("/user/info")],
      });
    }
  }, [defaultData?.email, loginUser?.email, queryClient]);

  const { mutateAsync } = useFormMutationGen<UserInfo>(
    updateApiPath,
    {
      headers: { "content-type": "application/x-www-form-urlencoded" },
    },
    {
      onSuccess: refetchUserInfo,
    }
  );

  return (
    <FormGenerator<UserInfo>
      schema={userSchema}
      defaultData={defaultData}
      mutation={mutateAsync}
      CompleteView={<MutateComplete text="更新" closeModal={closeModal} />}
      ErrorView={<MutateError text="更新" closeModal={closeModal} />}
      goBackFunc={closeModal}
    />
  );
};
