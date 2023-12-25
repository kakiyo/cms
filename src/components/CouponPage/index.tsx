import { Button, Paper } from "@mui/material";
import { Stack } from "@mui/system";
import { FC, useCallback, useState } from "react";
import { WithErrorMessage } from "../common/HelperText/ErrorMessage";
import { CmsModal } from "../common/Modal";
import { ScrollContainer } from "../common/ScrollContainer";
import { SearchPanel } from "../common/SearchPanel";
import { couponSearchSchema } from "./Schema/couponSearchSchema";
import { useCouponColumns } from "./couponTableOptions";
import { useCouponModalController } from "@/components/CouponPage/useCouponModalController";
import { Table } from "@/components/common/Table";
import { useQueryGen } from "@/hooks/useQueryGen";
import { useRefetchOnModalClose } from "@/hooks/useRefetchOnModalClose";
import { useScroll } from "@/hooks/useScroll";
import { useGetAuthState } from "@/store/auth";
import { useModalSetter } from "@/store/modal";
import { CouponListApi, CouponListItem } from "@/types/couponApi";
import { userRoleMap } from "@/types/user";
import { createApiPath } from "@/utils/url/createApiPath";

export const CouponPageView: FC = () => {
  const [page, setPage] = useState({ page: 1, pageSize: 50 });
  const { openModal } = useModalSetter();
  const { setCreateModal } = useCouponModalController();
  const user = useGetAuthState();
  const [searchParams, setSearchParams] = useState({
    chain_store_name: "",
    coupon_text: "",
    campaign_id: "",
  });
  const setParams = useCallback((props: typeof searchParams) => {
    setPage({ page: 1, pageSize: 50 });
    setSearchParams(props);
  }, []);
  const isRead = user?.role === userRoleMap.read;

  const [curData, setCurData] = useState<CouponListItem | null>(null);
  const listApiPath = createApiPath("/coupons");
  const { data, fetchStatus, refetch } = useQueryGen<CouponListApi>(
    listApiPath,
    {
      page: page.page,
      ...searchParams,
    }
  );
  const isLoading = fetchStatus === "fetching";

  const { columns, ImageBackDrop } = useCouponColumns({ curData, setCurData });

  const addGrayOutClass = useCallback((params: any) => {
    return params.row.status === 2 ? "grayOut" : "";
  }, []);

  const onClickCreate = useCallback(() => {
    setCreateModal();
    openModal();
  }, [openModal, setCreateModal]);

  const { ref, scrollToTop } = useScroll();

  useRefetchOnModalClose(refetch);

  return (
    <ScrollContainer ref={ref} scrollToTop={scrollToTop}>
      <Stack spacing={2}>
        <SearchPanel schema={couponSearchSchema} setParams={setParams} />
        <Paper sx={{ height: "100%", width: "100%", padding: 1 }}>
          <Table
            getRowClassName={addGrayOutClass}
            columns={columns}
            rows={data?.coupon_list ?? []}
            isLoading={isLoading}
            setPaginationModel={setPage}
            rowHeight={100}
            rowCount={data?.total ?? 0}
            paginationModel={page}
            toolBarContent={
              <WithErrorMessage
                errors={[
                  {
                    message: "権限がありません",
                    isError: isRead,
                  },
                ]}
              >
                <Button
                  onClick={onClickCreate}
                  variant="contained"
                  disabled={isRead}
                >
                  新規追加
                </Button>
              </WithErrorMessage>
            }
          />
        </Paper>
        <CmsModal />
      </Stack>
      {ImageBackDrop}
    </ScrollContainer>
  );
};
