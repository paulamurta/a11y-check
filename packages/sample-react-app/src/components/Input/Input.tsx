import TextField from "@mui/material/TextField";
import type { InputProps } from "./Input.types";

const resolveError = (error: InputProps["error"]) =>
  typeof error === "string" ? error : error ? "Campo inválido" : undefined;

export function Input({
  label,
  error,
  invalidAccessibility = false,
  fullWidth = true,
  ...props
}: InputProps) {
  const helperText = resolveError(error);

  return (
    <TextField
      data-component="Input"
      fullWidth={fullWidth}
      label={invalidAccessibility ? undefined : label}
      error={!invalidAccessibility && Boolean(helperText)}
      helperText={invalidAccessibility ? undefined : helperText}
      {...props}
    />
  );
}
