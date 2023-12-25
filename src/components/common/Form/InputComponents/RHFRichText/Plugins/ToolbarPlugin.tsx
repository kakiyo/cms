import { TOGGLE_LINK_COMMAND } from "@lexical/link";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $patchStyleText } from "@lexical/selection";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import LinkIcon from "@mui/icons-material/Link";
import { IconButton, Stack, Tooltip } from "@mui/material";
import { $getSelection, $isRangeSelection, RangeSelection } from "lexical";
import { FC, useCallback } from "react";

export const ToolbarPlugin: FC = () => {
  const [editor] = useLexicalComposerContext();

  const clearStyle = (selection: RangeSelection) => {
    $patchStyleText(selection, { color: null });
  };

  const clearLink = useCallback(() => {
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
  }, [editor]);

  const clearAll = useCallback(() => {
    editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) {
        return;
      }
      clearLink();
      clearStyle(selection);
    });
  }, [clearLink, editor]);

  const onClickLink = useCallback(() => {
    editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) {
        return;
      }
      clearStyle(selection);
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, "https://");
    });
  }, [editor]);

  const onClickColor = useCallback(
    (color: string) => {
      editor.update(() => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) {
          return null;
        }
        clearStyle(selection);
        clearLink();
        $patchStyleText(selection, { color });
      });
    },
    [clearLink, editor]
  );

  // RichTextの色を設定
  const onClickRed = useCallback(() => onClickColor("#EB5055"), [onClickColor]);
  const onClickBlue = useCallback(
    () => onClickColor("#22198A"),
    [onClickColor]
  );

  return (
    <Stack direction="row" borderBottom="1px double rgba(0, 0, 0, 0.23)">
      <Tooltip title="リンク" placement="top">
        <IconButton onClick={onClickLink}>
          <LinkIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="文字色赤" placement="top">
        <IconButton onClick={onClickRed}>
          <BorderColorIcon sx={{ color: "red" }} />
        </IconButton>
      </Tooltip>
      <Tooltip title="文字色青" placement="top">
        <IconButton onClick={onClickBlue}>
          <BorderColorIcon sx={{ color: "blue" }} />
        </IconButton>
      </Tooltip>
      <Tooltip title="文字色削除" placement="top">
        <IconButton onClick={clearAll}>
          <DeleteForeverIcon sx={{ color: "black" }} />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};
