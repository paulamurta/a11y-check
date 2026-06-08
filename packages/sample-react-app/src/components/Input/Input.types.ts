import type { TextFieldProps } from "@mui/material/TextField";
import type { WithInvalidA11y, WithId } from "../shared.types";

export type InputProps = Omit<TextFieldProps, "error" | "label"> &
  WithInvalidA11y &
  WithId & {
    label?: string;
    error?: string | boolean;
  };
