export const deepClone = (obj: any) => {
  if (typeof obj !== "object") {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj;
  }
  const clone = Object.assign({}, obj);
  Object.keys(clone).map((key) => {
    return Object.assign(clone, { [key]: deepClone(obj[key]) });
  });
  return clone;
};
