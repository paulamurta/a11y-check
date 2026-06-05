import type { TextFieldProps } from "@mui/material/TextField";
import type { WithInvalidA11y } from "../shared.types";

export type InputProps = Omit<TextFieldProps, "error" | "label"> &
  WithInvalidA11y & {
    label?: string;
    error?: string | boolean;
  };
