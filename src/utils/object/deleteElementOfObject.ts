import { deepClone } from "./deepClone";

export const deleteElementOfObject = <
  T extends { [key: string]: unknown } = { [key: string]: unknown }
>(
  object: T,
  elements: string[]
) => {
  const copy = deepClone(object);
  for (const element of elements) {
    delete copy[element];
  }
  return copy;
};
