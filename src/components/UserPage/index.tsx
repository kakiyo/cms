import { Paper, Stack } from "@mui/material";
import { FC, useCallback, useState } from "react";
import { CmsModal } from "../common/Modal";
import { ScrollContainer } from "../common/ScrollContainer";
import { SearchPanel } from "../common/SearchPanel";
import { userSearchSchema } from "./Schema/userSearchSchema";
import { useUserColumns } from "./userTableOptions";
import { Table } from "@/components/common/Table";
import { useQueryGen } from "@/hooks/useQueryGen";
import { useRefetchOnModalClose } from "@/hooks/useRefetchOnModalClose";
import { useScroll } from "@/hooks/useScroll";
import { UserListApi } from "@/types/user";
import { createApiPath } from "@/utils/url/createApiPath";

export const UserPageView: FC = () => {
  const [paginationModel, setPaginationModel] = useState({
    page: 1,
    pageSize: 50,
  });
  const [searchParams, setSearchParams] = useState({
    name: "",
    email: "",
  });
  const setParams = useCallback((newVal: typeof searchParams) => {
    setPaginationModel({ page: 1, pageSize: 50 });
    setSearchParams(newVal);
  }, []);
  const userApiPath = createApiPath("users");
  const { data, fetchStatus, refetch } = useQueryGen<UserListApi>(userApiPath, {
    page: paginationModel.page,
    name: searchParams.name,
    email: searchParams.email,
  });
  const isLoading = fetchStatus === "fetching";
  const { columns } = useUserColumns();

  const { ref, scrollToTop } = useScroll();

  useRefetchOnModalClose(refetch);

  return (
    <ScrollContainer ref={ref} scrollToTop={scrollToTop}>
      <Stack spacing={2}>
        <SearchPanel setParams={setParams} schema={userSearchSchema} />
        <Paper style={{ height: "100%", width: "100%", padding: 8 }}>
          <Table
            rows={data?.user_list ?? []}
            rowCount={data?.total ?? 0}
            columns={columns}
            isLoading={isLoading}
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
            rowHeight={60}
          />
        </Paper>
      </Stack>
      <CmsModal />
    </ScrollContainer>
  );
};
