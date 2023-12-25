export const createApiPath = (path: string) => {
  const domain = process.env.NEXT_PUBLIC_API || "";
  // ドメインの最後にスラッシュを付ける
  const domainWithSlash = domain.endsWith("/") ? domain : domain + "/";
  // パスの先頭にスラッシュがあれば削除する
  const pathWithoutLeadingSlash = path.startsWith("/") ? path.slice(1) : path;
  // ドメインとパスを結合する
  return domainWithSlash + pathWithoutLeadingSlash;
};
