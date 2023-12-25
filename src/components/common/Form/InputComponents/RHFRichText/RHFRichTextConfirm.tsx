import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { FC } from "react";
import { useStyles } from "./theme";

type Props = {
  config: Parameters<typeof LexicalComposer>["0"]["initialConfig"];
};
export const RHFRichTextConfirm: FC<Props> = (props) => {
  const { config } = props;
  const themeClasses = useStyles();

  return (
    <LexicalComposer
      // 確認時はrootのmarginを削除する
      initialConfig={{ ...config, theme: { link: themeClasses.link } }}
    >
      <RichTextPlugin
        contentEditable={<ContentEditable />}
        placeholder={<></>}
        ErrorBoundary={LexicalErrorBoundary}
      />
    </LexicalComposer>
  );
};
