import { ClassNameMap } from "@mui/styles";
import { EditorState } from "lexical";
import { isJson } from "../object/isJson";

export type ThemeEditorState = {
  theme: ClassNameMap;
  editorState: EditorState;
};

/**
 * jsonは以下の例のように{editorState: editorState}の形式で設定してください。
 * JSON.stringify({editorState: editorState.toJSON()})
 * @param json
 * @returns
 */
export const getPlainText = (json: string) => {
  if (!isJson(json)) {
    return "";
  }
  const editorState = JSON.parse(json)?.editorState;

  const getText: (item: any) => string = (item) => {
    let text = "";
    if (!(typeof item === "object")) {
      return "";
    }
    if ("text" in item) {
      text += item.text;
    }

    if (
      "children" in item &&
      Array.isArray(item.children) &&
      item.children.length
    ) {
      text += item.children
        .map((child: any) => getText(child))
        .reduce((sum: number, item: number) => (sum += item));
    }

    return text;
  };

  return getText(editorState.root);
};
