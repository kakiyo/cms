import { mergeRegister } from "@lexical/utils";
import {
  COMMAND_PRIORITY_HIGH,
  COMMAND_PRIORITY_LOW,
  BLUR_COMMAND,
  KEY_ESCAPE_COMMAND,
  SELECTION_CHANGE_COMMAND,
  LexicalEditor,
} from "lexical";
import { Dispatch, useEffect } from "react";

/**
 * floatingLinkで使用するコマンドを登録する
 * @param editor
 * @param updateLinkEditor
 * @param isShow
 * @param setIsShow
 * @param isEditMode
 */
export const useRegisterCommands = (
  editor: LexicalEditor,
  updateLinkEditor: () => void,
  isShow: boolean,
  setIsShow: Dispatch<boolean>,
  isEditMode: boolean
) => {
  useEffect(() => {
    // mergeRegisterは、register関数のクリーンアップ関数を受け取り、受け取った関数を順番に実行する関数を返却している
    return mergeRegister(
      // エディターが更新されたらupdateLinkEditorを実行する
      // updateLinkEditorの実行にはeditorの情報が必要なため、read関数内で実行する必要がある
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateLinkEditor();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateLinkEditor();
          return true;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_ESCAPE_COMMAND,
        () => {
          if (isShow) {
            setIsShow(false);
            return true;
          }
          return false;
        },
        COMMAND_PRIORITY_HIGH
      ),
      editor.registerCommand(
        BLUR_COMMAND,
        () => {
          if (isShow && !isEditMode) {
            setIsShow(false);
            return true;
          }
          return false;
        },
        COMMAND_PRIORITY_LOW
      )
    );
  }, [editor, updateLinkEditor, setIsShow, isShow, isEditMode]);
};
