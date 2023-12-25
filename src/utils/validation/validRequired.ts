import { Valid } from "./types";

export const validRequired: Valid<string, { label: string }> = (
  value,
  { label }
) => !!value || `${label}は必須です`;
