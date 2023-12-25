import { Alert, Stack } from "@mui/material";
import { FC, useCallback } from "react";
import { useApiErrorSetter, useGetApiError } from "@/store/apiError";
import { ErrorCode, getApiError } from "@/utils/apiError/getApiError";

export const ErrorStack: FC = () => {
  const apiErrors = useGetApiError();

  return (
    <Stack direction="column" spacing={1}>
      {apiErrors.map((code, key) => {
        return (
          <ErrorAlert key={`api_error_popup_${key}`} code={code} index={key} />
        );
      })}
    </Stack>
  );
};

type ContentProps = {
  index: number;
  code: ErrorCode;
};

const ErrorAlert: FC<ContentProps> = (props) => {
  const { index, code } = props;
  const { removeError } = useApiErrorSetter();
  const onClose = useCallback(() => {
    removeError(index);
  }, [index, removeError]);

  return (
    <Alert severity="error" sx={{ width: "100%" }} onClose={onClose}>
      code: {code} {getApiError(code)}
    </Alert>
  );
};
