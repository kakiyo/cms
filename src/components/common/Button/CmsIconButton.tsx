import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  IconButton,
  IconButtonProps,
  SxProps,
  Tooltip,
} from "@mui/material";
import React from "react";

type Props = {
  variant: "edit" | "delete" | "copy" | "detail";
  disabled?: boolean;
} & Omit<IconButtonProps, "disabled">;

export const CmsIconButton: React.FC<Props> = (props) => {
  const { variant, disabled, ...iconButtonProps } = props;
  const graySx: SxProps = {
    fill: disabled ? "gray" : "white",
  };
  const btnTypeConstants: {
    // eslint-disable-next-line no-unused-vars
    [key in Props["variant"]]: { name: string; icon: React.ReactElement };
  } = {
    edit: {
      name: "編集",
      icon: <EditIcon sx={graySx} />,
    },
    delete: {
      name: "削除",
      icon: <DeleteIcon sx={graySx} />,
    },
    copy: {
      name: "複製",
      icon: <ContentCopyIcon sx={graySx} />,
    },
    detail: {
      name: "詳細",
      icon: <ContentPasteSearchIcon sx={graySx} />,
    },
  };
  // user権限を見て表示・非表示を判別。管理者のみ表示。
  // if (showAdminOnly && admin?.role !== "admin") return null;

  return (
    <Tooltip title={btnTypeConstants[variant].name} placement="top-start">
      <Box>
        <IconButton
          data-cy="cms-button-edit"
          style={{
            padding: "4px",
            margin: "4px",
            background: "#3C3C5A",
          }}
          disabled={disabled}
          {...iconButtonProps}
        >
          {btnTypeConstants[variant].icon}
        </IconButton>
      </Box>
    </Tooltip>
  );
};
