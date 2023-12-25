import { SearchSchema } from "@/components/common/SearchPanel/types";

export const userSearchSchema: SearchSchema = [
  { type: "text", label: "ユーザー名", key: "name" },
  { type: "text", label: "メールアドレス", key: "email" },
];
