import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { useCallback } from "react";
import { axiosClient } from "@/provider/QueryClientProvider";

type ArgumentTypes<F> = F extends (...args: infer A) => void ? A : never;

export const useFormMutationGen = function <TData>(
  path: string,
  config?: AxiosRequestConfig,
  reactQueryConfig?: ArgumentTypes<typeof useMutation>[2]
) {
  return useMutation(
    (data: TData) =>
      axiosClient.post(path, data, {
        headers: { "content-type": "multipart/form-data" },
        ...config,
      }),
    { ...reactQueryConfig }
  );
};

/**
 *
 * @param path
 * @param exclusive
 * @returns
 */
export const useExclusiveMutationGen = (
  path: string,
  exclusive: { curUpdated: string; apiPath: string }
) => {
  const formMutationGenRes = useFormMutationGen(path);

  const exclusiveMutate = useCallback(
    async (variables: unknown) => {
      //編集した項目の最新データ取得
      const latestData = await axiosClient(exclusive.apiPath);
      const isSameUpdateTime =
        latestData?.data.updated === exclusive.curUpdated;
      if (isSameUpdateTime) {
        //編集の間にデータの更新がなかった場合(updatedの値が一致した場合)
        await formMutationGenRes.mutateAsync(variables);
        return formMutationGenRes;
      } else {
        throw new Error("更新するデータが最新ではありません");
      }
    },
    [exclusive.apiPath, exclusive.curUpdated, formMutationGenRes]
  );

  return {
    exclusiveMutate,
  };
};
