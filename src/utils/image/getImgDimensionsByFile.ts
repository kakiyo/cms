import { getImgDimensionsByUrl } from "./getImgDimensionsByUrl";
import { ImgSize } from "./types";

export const getImgDimensionsByFile = (imgFile: File) => {
  return new Promise<ImgSize>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target) {
        resolve(getImgDimensionsByUrl(event.target.result as string));
      } else {
        reject(new Error("画像の読み込みに失敗しました。"));
      }
    };
    reader.readAsDataURL(imgFile);
  });
};
