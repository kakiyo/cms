import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "@/provider/QueryClientProvider";

export type ApiInterface = {
  params?: any;
  response: any;
};

export const useQueryGen = function <T extends ApiInterface>(
  path: string,
  params?: T["params"],
  options?: Parameters<typeof useQuery>[2]
) {
  const queryKey = params ? `${path}+${JSON.stringify(params)}` : path;
  return useQuery<T["response"]>(
    [queryKey],
    () => axiosClient.get(path, { params: params }).then((res) => res.data),
    options
  );
};
