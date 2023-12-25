import { AsyncValid } from "./types";

export const validFileSize: AsyncValid<
  File | string | undefined,
  number
> = async (file, size) => {
  // undefinedの場合はチェックしない
  // file型以外は検査しない
  if (!file || !(file instanceof File)) {
    return;
  }

  return (
    file.size < size ||
    `ファイルが大きすぎます。サイズは ${
      size / 1024
    } キロバイトを超えることができません。`
  );
};
