import { Valid } from "./types";

export const validFileType: Valid<string, string> = (fileName, fileType) => {
  // undefinedの場合はチェックしない
  if (!fileName) {
    return;
  }

  return fileName.endsWith(fileType) || "ファイル形式が異なります";
};
