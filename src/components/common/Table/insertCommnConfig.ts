import { GridColDef, GridValidRowModel } from "@mui/x-data-grid";

export const insertCommonConfig = <T extends GridValidRowModel>(
  columns: GridColDef<T>[]
) => {
  return columns.map((column) => ({
    ...column,
    flex: 1,
    headerAlign: "center",
    align: "center",
    sortable: false,
  })) as GridColDef<T>[];
};
