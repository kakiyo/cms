import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useFloatingLinkEditorToolbar } from "./hooks/useFloatingLinkeditorToolbar";

export default function FloatingLinkEditorPlugin({
  scrollerElem = document.body,
}: {
  scrollerElem?: HTMLElement;
}): JSX.Element | null {
  const [editor] = useLexicalComposerContext();
  return useFloatingLinkEditorToolbar(editor, scrollerElem);
}
