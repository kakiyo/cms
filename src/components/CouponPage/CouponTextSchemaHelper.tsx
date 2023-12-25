import { Box, Button, Chip, Typography, useTheme } from "@mui/material";
import { FC, useCallback, useMemo } from "react";
import { CmsModal } from "../common/Modal";
import { ScrollContainer } from "../common/ScrollContainer";
import { useModalSetter } from "@/store/modal";

export const CouponTextHelper: FC = () => {
  const theme = useTheme();
  const wordListList = useMemo(
    () => [
      [
        "theme",
        "link",
        "root",
        "editorState",
        "children",
        "detail",
        "format",
        "mode",
        "normal",
        "style",
        "text",
        "type",
        "version",
        "direction",
        "ltr",
        "indent",
        "paragraph",
      ],
      ["0", "1", "{", "}", "[", "]", '"', "'", ":", "}:{"],
    ],
    []
  );
  const { openModal, closeModal, setModalContents, setModalHeader } =
    useModalSetter();
  const onClick = useCallback(() => {
    setModalContents(
      <ScrollContainer>
        {wordListList.map((wordList, index) => {
          return (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(120px,1fr))",
                gap: "12px",
                mb: "12px",
                maxWidth: "860px",
                mx: "auto",
              }}
              key={`wordList ${index}`}
            >
              {wordList.map((word) => {
                return <Chip label={word} key={word} />;
              })}
            </Box>
          );
        })}
        <Button onClick={closeModal} variant="outlined" fullWidth>
          閉じる
        </Button>
      </ScrollContainer>
    );
    setModalHeader("検索に使えない単語一覧");
    openModal();
  }, [closeModal, openModal, setModalContents, setModalHeader, wordListList]);

  return (
    <>
      <Typography
        component="span"
        color={theme.palette.error.main}
        sx={{
          "::before": {
            display: "inline",
            content: "'⚠ '",
          },
        }}
      >
        <Button
          sx={{
            p: 0,
            fontSize: "16px",
            lineHeight: 1.7,
            height: "fit-content",
            textDecoration: `underline 1px `,
          }}
          onClick={onClick}
        >
          一部の特定単語
        </Button>
        のみで検索すると全件検索となります
      </Typography>
      <CmsModal />
    </>
  );
};
