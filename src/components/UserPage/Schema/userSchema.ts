import { Schema } from "../../common/Form/FormGenerator/types";

export const userSchema: Schema = {
  formSchema: [
    {
      name: "role",
      label: "ロール",
      inputType: "Select",
      list: [
        {
          label: "admin",
          value: "admin",
        },
        {
          label: "read",
          value: "read",
        },
        {
          label: "write",
          value: "write",
        },
      ],
    },
  ],
};
