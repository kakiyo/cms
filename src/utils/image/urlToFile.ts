export const urlToFile = async (url: string, fileName = "fileName") => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], fileName);
  } catch {
    return new File([new Blob()], "fetch failed");
  }
};
