import { TOGGLE_LINK_COMMAND } from "@lexical/link";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Box, IconButton, Stack, TextField } from "@mui/material";
import { LexicalEditor } from "lexical";
import {
  Dispatch,
  useCallback,
  useEffect,
  useRef,
  useState,
  MouseEventHandler,
  ChangeEventHandler,
  KeyboardEvent,
} from "react";

import { useRegisterCommands } from "./hooks/useRegisterCommands";
import { useUpdateLinkEditor } from "./hooks/useUpdateLinkEditor";
import { useWindowListener } from "./hooks/useWindowListener";
import { useStyles } from "./styles";

export const FloatingLinkEditor = ({
  editor,
  isShowToolbar,
  setIsShow,
  anchorElem,
}: {
  editor: LexicalEditor;
  isShowToolbar: boolean;
  setIsShow: Dispatch<boolean>;
  anchorElem: HTMLElement;
}): JSX.Element => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [linkUrl, setLinkUrl] = useState("");
  const [editedLinkUrl, setEditedLinkUrl] = useState("");
  const [isEditMode, setEditMode] = useState(false);
  const classes = useStyles();

  // LinkEditorの位置を調整する関数を取得
  const { updateLinkEditor } = useUpdateLinkEditor(
    setLinkUrl,
    editorRef,
    editor,
    anchorElem
  );

  // コマンドを登録
  useRegisterCommands(
    editor,
    updateLinkEditor,
    isShowToolbar,
    setIsShow,
    isEditMode
  );

  // スクロールと画面のリサイズ時にLinkEditorの位置を調整
  useWindowListener(editor, updateLinkEditor, anchorElem);

  // linkEditorがeditorモードになったらinputにフォーカス;
  useEffect(() => {
    if (isEditMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditMode]);

  // linkを更新してeditorStateに反映させる
  const handleLinkSubmission = useCallback(() => {
    if (linkUrl !== "") {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, editedLinkUrl);
    }
    setEditMode(false);
  }, [editedLinkUrl, editor, linkUrl]);

  const onKeyDownTextField = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleLinkSubmission();
      } else if (event.key === "Escape") {
        event.preventDefault();
        setEditMode(false);
      }
    },
    [handleLinkSubmission]
  );

  const setEditModeFalse = useCallback(() => {
    setEditMode(false);
  }, []);

  const clearLink = useCallback(() => {
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
  }, [editor]);

  const handleMouseDown: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.preventDefault();
    },
    []
  );

  const onClickEditButton = useCallback(() => {
    setEditedLinkUrl(linkUrl);
    setEditMode(true);
  }, [linkUrl]);

  const onChangeTextField: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setEditedLinkUrl(e.currentTarget.value);
    },
    []
  );

  return (
    <Box
      ref={editorRef}
      className="link-editor"
      sx={{
        display: "flex",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 100,
        maxWidth: "400px",
        width: "100%",
        opacity: 0,
        backgroundColor: "#fff",
        boxShadow: "0 5px 10px rgba(0, 0, 0, 0.3)",
        borderRadius: "0 0 8px 8px",
        transition: "opacity 0.5s",
        willChange: "transform",
        paddingRight: 1,
      }}
    >
      {!isShowToolbar ? null : isEditMode ? (
        <Stack
          direction="row"
          justifyContent="space-between"
          width="100%"
          spacing={1}
        >
          <TextField
            inputRef={inputRef}
            fullWidth
            sx={{ padding: 0, margin: 0 }}
            className="link-input"
            value={editedLinkUrl}
            onChange={onChangeTextField}
            onKeyDown={onKeyDownTextField}
          />
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton
              className={classes.linkEditorButton}
              role="button"
              tabIndex={0}
              onMouseDown={handleMouseDown}
              onClick={setEditModeFalse}
            >
              <HighlightOffIcon />
            </IconButton>
            <IconButton
              className={classes.linkEditorButton}
              role="button"
              tabIndex={0}
              onMouseDown={handleMouseDown}
              onClick={handleLinkSubmission}
            >
              <CheckIcon />
            </IconButton>
          </Stack>
        </Stack>
      ) : (
        <Stack
          direction="row"
          justifyContent="space-between"
          width="100%"
          alignItems="center"
        >
          <Box sx={{ padding: "16.5px 14px", wordBreak: "break-word" }}>
            <a href={linkUrl} target="_blank" rel="noopener noreferrer">
              {linkUrl}
            </a>
          </Box>
          <Stack direction="row" spacing={1}>
            <IconButton
              className={classes.linkEditorButton}
              role="button"
              tabIndex={0}
              onMouseDown={handleMouseDown}
              onClick={onClickEditButton}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              className={classes.linkEditorButton}
              role="button"
              tabIndex={0}
              onMouseDown={handleMouseDown}
              onClick={clearLink}
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        </Stack>
      )}
    </Box>
  );
};
