import { ValidateResult } from "react-hook-form";

export type Valid<T, U = void> = (
  value: T | undefined,
  otherProps: U
) => ValidateResult;

export type AsyncValid<T, U = void> = (
  value: T | undefined,
  otherProps: U
) => Promise<ValidateResult>;
