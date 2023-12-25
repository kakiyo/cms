import { getImgDimensionsByFile } from "../image/getImgDimensionsByFile";
import { AsyncValid } from "./types";

export const validImgDimensions: AsyncValid<
  File | string | undefined,
  { width: number; height: number; label: string }
> = async (img, { width, height, label }) => {
  // undefinedの場合はチェックしない
  // URLの場合はチェックしない
  if (!img || typeof img === "string") {
    return;
  }

  const size = await getImgDimensionsByFile(img);

  return (
    (size.height === height && size.width === width) ||
    `${label}は幅${width}px, 高さ${height}pxにしてください`
  );
};
