import { Box, Typography } from "@mui/material";
import { FC, useCallback, useState } from "react";

type Props = {
  imagePath?: string;
  height?: number;
  width?: number;
};

export const RHFImgUploaderConfirm: FC<Props> = (props) => {
  const { imagePath, width, height = 200 } = props;

  // 画像の読み込みしに失敗した場合はその旨を表示する
  const [existImage, setExistImage] = useState(true);
  const onMissLoadImage = useCallback(
    () => setExistImage(false),
    [setExistImage]
  );

  if (!imagePath) {
    return <></>;
  }

  if (!existImage) {
    return (
      <Typography m="auto 0" color="error">
        画像を正常に読み込めませんでした
      </Typography>
    );
  }

  return (
    <Box height={height} width={width || "100%"} position="relative">
      <img
        src={imagePath}
        alt="アップロードされた画像"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{
          objectFit: "contain",
          objectPosition: "0 0",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        onError={onMissLoadImage}
      />
    </Box>
  );
};
