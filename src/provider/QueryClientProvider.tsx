import {
  QueryClient,
  QueryClientProvider as RQQueryClientProvider,
} from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { FC, ReactNode, useMemo } from "react";
import { useApiErrorSetter } from "@/store/apiError";
import { ErrorCode } from "@/utils/apiError/getApiError";

type Props = {
  children: ReactNode;
};

export const axiosClient = axios.create({
  withCredentials: true,
});

export const QueryClientProvider: FC<Props> = (props) => {
  const { children } = props;
  const { addError } = useApiErrorSetter();

  const onError = (e: unknown) => {
    const error = e as AxiosError;
    if (error.response?.status) {
      addError(error.response?.status as ErrorCode);
    }
  };

  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            onError,
            keepPreviousData: true,
            refetchOnWindowFocus: false,
          },
        },
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <RQQueryClientProvider client={queryClient}>
      {children}
    </RQQueryClientProvider>
  );
};
