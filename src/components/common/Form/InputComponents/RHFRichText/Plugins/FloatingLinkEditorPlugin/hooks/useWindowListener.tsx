import { LexicalEditor } from "lexical";
import { useEffect } from "react";

/**
 * 画面サイズが変わった時と画面がスクロールした際にfloatingEditorの位置を調整する
 * @param editor
 * @param updateLinkEditor
 * @param anchorElem
 */
export const useWindowListener = (
  editor: LexicalEditor,
  updateLinkEditor: () => void,
  anchorElem: HTMLElement
) => {
  // スクロールと画面のリサイズ時にlinkEditorの位置を調整
  useEffect(() => {
    const update = () => {
      editor.getEditorState().read(() => {
        updateLinkEditor();
      });
    };

    window.addEventListener("resize", update);

    if (anchorElem) {
      anchorElem.addEventListener("scroll", () => {
        update();
      });
    }

    return () => {
      window.removeEventListener("resize", update);

      if (anchorElem) {
        anchorElem.removeEventListener("scroll", update);
      }
    };
  }, [anchorElem, anchorElem.parentElement, editor, updateLinkEditor]);
};
