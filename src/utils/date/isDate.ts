export const isDate = (str: string) => {
  const date = new Date(str);
  // Invalid dateなDateオブジェクトはgetTimeでNaNを返却する
  return !Number.isNaN(date.getTime());
};
