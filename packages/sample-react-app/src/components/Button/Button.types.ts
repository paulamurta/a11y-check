import type { WithId } from "../shared.types";

export type ButtonProps = WithId & {
  label?: string;
  iconUrl?: string;
  loading?: boolean;
  disabled?: boolean;
};
