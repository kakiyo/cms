import { ImgSize } from "./types";

export const getImgDimensionsByUrl = (imgFile: string) => {
  return new Promise<ImgSize>((resolve) => {
    const img = new Image();
    img.onload = () => {
      const size = {
        width: img.naturalWidth,
        height: img.naturalHeight,
      };
      resolve(size);
    };
    img.src = imgFile;
  });
};
