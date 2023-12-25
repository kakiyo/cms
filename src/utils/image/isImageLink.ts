export const isImageLink = (url: string) => {
  return /^https?:\/\/.+\.(png|jpe?g|gif|webp)$/i.test(url);
};
