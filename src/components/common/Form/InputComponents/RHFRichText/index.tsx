import { LinkNode } from "@lexical/link";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { Stack } from "@mui/material";
import { EditorState } from "lexical/LexicalEditorState";
import { FC, useCallback } from "react";
import { InputGeneratorProps, RichTextSchema } from "../../FormGenerator/types";
import FloatingLinkEditorPlugin from "./Plugins/FloatingLinkEditorPlugin";
import { ToolbarPlugin } from "./Plugins/ToolbarPlugin";
import { RHFRichTextConfirm } from "./RHFRichTextConfirm";
import { useStyles } from "./styles";
import { useStyles as useThemeStyles } from "./theme";
import { useGetScrollContainerElemState } from "@/store/scrollContainerElem";
import { isJson } from "@/utils/object/isJson";
import { ThemeEditorState, getPlainText } from "@/utils/richText/getPlainText";

export const RHFRichText: FC<InputGeneratorProps<RichTextSchema>> = (props) => {
  const { rhFormProps, formSchema, mode, error } = props;

  const value = rhFormProps.watch(formSchema.name) as string;

  const fieldProps = rhFormProps.register(formSchema.name, {
    required: formSchema.required,
    validate: formSchema.validates,
  });

  const classes = useStyles();
  const themeClasses = useThemeStyles();

  const onChange = useCallback(
    (editorState: EditorState) => {
      const editorStateJson = JSON.stringify({
        editorState: editorState.toJSON(),
      });
      rhFormProps.setValue(
        formSchema.name,
        JSON.stringify({
          plainText: getPlainText(editorStateJson),
          theme: themeClasses,
          editorState: editorState.toJSON(),
        }),
        { shouldValidate: true }
      );
    },
    [formSchema.name, rhFormProps, themeClasses]
  );

  const getDefaultValue = (json: string) => {
    if (isJson(json)) {
      const themeEditorState = JSON.parse(json) as ThemeEditorState;
      return JSON.stringify(themeEditorState.editorState);
    }
    return null;
  };
  const defaultValue = getDefaultValue(
    rhFormProps.getValues(formSchema.name) as string
  );

  const editorState = defaultValue ? defaultValue : undefined;

  const editorNodes = [LinkNode];

  const config: Parameters<typeof LexicalComposer>["0"]["initialConfig"] = {
    namespace: formSchema.name,
    onError: (e, editor) => console.log(`e => ${e} editor => ${editor}`),
    nodes: editorNodes,
    theme: themeClasses,
    editorState,
  };

  // scroll containerのhtmlElementを取得
  const scrollerElem = useGetScrollContainerElemState() ?? document.body;

  if (mode === "confirm") {
    return <RHFRichTextConfirm config={{ ...config, editable: false }} />;
  }

  return (
    <Stack
      border={`1px solid ${error ? "#d32f2f" : "rgba(0, 0, 0, 0.23)"}`}
      borderRadius={1}
    >
      <input
        {...fieldProps}
        value={value}
        style={{ height: 0, border: 0, padding: 0 }}
      />
      <LexicalComposer initialConfig={config}>
        <ToolbarPlugin />
        <RichTextPlugin
          contentEditable={
            <ContentEditable className={classes.editableContainer} />
          }
          placeholder={<></>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <FloatingLinkEditorPlugin scrollerElem={scrollerElem} />
        <LinkPlugin />
        <OnChangePlugin onChange={onChange} />
        <HistoryPlugin />
      </LexicalComposer>
    </Stack>
  );
};
