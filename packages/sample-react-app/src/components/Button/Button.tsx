import "./Button.css";

import MuiButton from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import type { ButtonProps } from "./Button.types";

export function Button({
  label,
  iconUrl,
  loading = false,
  disabled = false,
}: ButtonProps) {
  const showSpinner = loading || disabled;

  const useLabel = Boolean(label) && !showSpinner && !iconUrl;

  return (
    <MuiButton
      data-component="Button"
      data-source-file={import.meta.url}
      variant="contained"
      color="primary"
      disabled={disabled || loading}
      sx={
        showSpinner && !label
          ? {
              minWidth: 48,
              minHeight: 40,
            }
          : undefined
      }
    >
      {useLabel && <span>{label}</span>}

      {showSpinner ? (
        <CircularProgress size={22} color="inherit" aria-hidden />
      ) : (
        <>
          {iconUrl && (
            <img
              src={iconUrl}
              alt=""
              aria-hidden
              width={20}
              height={20}
              className="btn-icon"
            />
          )}
        </>
      )}
    </MuiButton>
  );
}
