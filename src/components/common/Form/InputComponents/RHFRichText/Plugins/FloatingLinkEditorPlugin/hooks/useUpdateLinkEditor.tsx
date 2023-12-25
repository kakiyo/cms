import { $isLinkNode } from "@lexical/link";
import { $getSelection, $isRangeSelection, LexicalEditor } from "lexical";

import { Dispatch, RefObject, useCallback } from "react";
import { getSelectedNode } from "../../../utils/getSelectedNode";
import { setFloatingElemPositionForLinkEditor } from "../setFloatingElemPositionForLinkEditor";

/**
 * floatingLinkの位置を更新する関数を返す
 * @param setLinkUrl
 * @param editorRef
 * @param editor
 * @param anchorElem
 * @returns
 */
export const useUpdateLinkEditor = (
  setLinkUrl: Dispatch<string>,
  editorRef: RefObject<HTMLElement>,
  editor: LexicalEditor,
  anchorElem: HTMLElement
) => {
  // selectionの状態によってFloatingEditorの位置を更新する
  const updateLinkEditor = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      // 設定されているURLを保存
      if ($isLinkNode(parent)) {
        setLinkUrl(parent.getURL());
      } else if ($isLinkNode(node)) {
        setLinkUrl(node.getURL());
      } else {
        setLinkUrl("");
      }
    }
    const editorElem = editorRef.current; // エディターのHTMLElement
    const nativeSelection = window.getSelection(); // 現在選択中のHTMLElement

    // エディターがないなら何もしない
    if (editorElem === null) {
      return;
    }

    const rootElement = editor.getRootElement();

    if (
      selection !== null &&
      nativeSelection !== null &&
      rootElement !== null &&
      rootElement.contains(nativeSelection.anchorNode) &&
      editor.isEditable()
    ) {
      const domRect: DOMRect | undefined =
        nativeSelection.focusNode?.parentElement?.getBoundingClientRect();
      if (domRect) {
        domRect.y += 40;
        // LinkEditorの位置をアクティブな要素のちょっと下に設定
        setFloatingElemPositionForLinkEditor(domRect, editorElem, anchorElem);
      }
    }

    return true;
  }, [anchorElem, editor, editorRef, setLinkUrl]);

  return {
    updateLinkEditor,
  };
};
