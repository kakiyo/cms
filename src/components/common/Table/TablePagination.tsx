import { Pagination, Stack, Typography } from "@mui/material";
// eslint-disable-next-line import/named
import { GridPaginationModel } from "@mui/x-data-grid";
import React, { Dispatch, SetStateAction, useCallback } from "react";

type Props = {
  paginationModel?: GridPaginationModel;
  totalCount?: number;
  setPaginationModel?: Dispatch<
    SetStateAction<{ page: number; pageSize: number }>
  >;
};
export const TablePagination: React.FC<Props> = ({
  paginationModel: { page, pageSize } = { page: 0, pageSize: 0 },
  totalCount = 0,
  setPaginationModel,
}) => {
  const handleOnChange = useCallback(
    (event: React.ChangeEvent<unknown>, eventPage: number) => {
      setPaginationModel &&
        setPaginationModel({ page: eventPage, pageSize: pageSize });
    },
    [setPaginationModel, pageSize]
  );
  return (
    <Stack direction="column" alignItems="center" width="100%" spacing={1}>
      <Pagination
        page={page}
        count={Math.ceil(totalCount / pageSize)}
        boundaryCount={5}
        onChange={handleOnChange}
      />
      <Typography>
        {totalCount}件中 {totalCount === 0 ? 0 : (page - 1) * pageSize + 1}〜
        {totalCount > page * pageSize ? page * pageSize : totalCount}
        件目表示
      </Typography>
    </Stack>
  );
};
