import { Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { FC, useCallback } from "react";
import {
  WithErrorMessage,
  ErrorObject,
} from "../common/HelperText/ErrorMessage";
import { useUserModalController } from "./useUserModalController";
import { CmsIconButton } from "@/components/common/Button/CmsIconButton";
import { useGetAuthState } from "@/store/auth";
import { useModalSetter } from "@/store/modal";
import { UserInfo, userRoleMap } from "@/types/user";

export const useUserColumns: () => { columns: GridColDef<UserInfo>[] } = () => {
  return {
    columns: [
      {
        field: "name",
        headerName: "ユーザー名",
        flex: 1,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "email",
        headerName: "メールアドレス",
        flex: 1,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "role",
        headerName: "権限",
        flex: 1,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "button",
        headerName: "編集・削除",
        flex: 1,
        headerAlign: "center",
        align: "center",
        renderCell: (params) => {
          return <UserTableButtons user={params.row} />;
        },
      },
    ],
  };
};

const UserTableButtons: FC<{ user: UserInfo }> = ({ user }) => {
  const { openModal } = useModalSetter();
  const { setUserEdit, setUserDelete } = useUserModalController();
  const onClickEdit = useCallback(() => {
    setUserEdit({ defaultData: user });
    openModal();
  }, [openModal, setUserEdit, user]);
  const onClickDelete = useCallback(() => {
    setUserDelete({ user });
    openModal();
  }, [openModal, setUserDelete, user]);
  const loginUser = useGetAuthState();
  const isRead = loginUser?.role === userRoleMap.read;
  const isWrite = loginUser?.role === userRoleMap.write;
  const isMySelf = loginUser?.id === user.id;
  const errors: ErrorObject[] = [
    {
      message: "権限がありません",
      isError: isWrite || isRead || isMySelf,
    },
  ];

  return (
    <>
      <WithErrorMessage errors={errors}>
        <Stack direction="row">
          <CmsIconButton
            variant={"edit"}
            onClick={onClickEdit}
            disabled={isRead || isWrite}
          />
          <CmsIconButton
            variant={"delete"}
            onClick={onClickDelete}
            disabled={isMySelf || isWrite || isRead}
          />
        </Stack>
      </WithErrorMessage>
    </>
  );
};
