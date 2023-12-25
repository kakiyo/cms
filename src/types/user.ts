import { ApiInterface } from "@/hooks/useQueryGen";
import { keyStingObject } from "@/types/general";

export interface UserInfo extends keyStingObject {
  id: number;
  name: string;
  email: string;
  role: string;
}
export interface UserList {
  total: number;
  user_list: Array<UserInfo | null>;
}

export interface UserInfoApi extends ApiInterface {
  response: UserInfo;
}
export interface UserListApi extends ApiInterface {
  response: UserList;
}

export const userRoleMap = {
  admin: "admin",
  write: "write",
  read: "read",
  new: "new",
};
