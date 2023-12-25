import { Box } from "@mui/system";
import { DataGrid, DataGridProps } from "@mui/x-data-grid";
import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { Loading } from "../Loading";
import { TablePagination } from "@/components/common/Table/TablePagination";

export const Table = (
  props: DataGridProps & {
    setPaginationModel: Dispatch<
      SetStateAction<{ page: number; pageSize: number }>
    >;
    toolBarContent?: ReactNode;
    isLoading?: boolean;
  }
) => {
  // ロード中はテーブルの中身を空にする
  const rows = props.isLoading ? [] : props.rows;
  return (
    <Box height="100%" width="100%">
      <DataGrid
        autoHeight
        disableColumnMenu
        disableColumnSelector
        disableRowSelectionOnClick
        loading={props.isLoading}
        paginationMode="server"
        slots={{
          pagination: () => (
            <Box pt="8px" width="100%">
              <TablePagination
                setPaginationModel={props.setPaginationModel}
                paginationModel={props.paginationModel}
                totalCount={props.rowCount}
              />
            </Box>
          ),
          loadingOverlay: Loading,
          toolbar: () => (
            <Box
              pb="8px"
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gridTemplateAreas: `". page tool"`,
              }}
            >
              <Box gridArea="page">
                <TablePagination
                  setPaginationModel={props.setPaginationModel}
                  paginationModel={props.paginationModel}
                  totalCount={props.rowCount}
                />
              </Box>
              {props.toolBarContent ? (
                <Box gridArea="tool">{props.toolBarContent}</Box>
              ) : (
                <></>
              )}
            </Box>
          ),
        }}
        sx={{
          border: "none",
          ".MuiDataGrid-cell:focus-within ": {
            outline: "none !important",
          },
          ".MuiDataGrid-cell:hover": {
            cursor: "default",
          },
          ".grayOut": {
            backgroundColor: "rgba(176,176,176,0.56)",
          },
          ".grayOut:hover": {
            backgroundColor: "rgba(176,176,176,0.56)",
          },
        }}
        {...props}
        rows={rows}
      />
    </Box>
  );
};
