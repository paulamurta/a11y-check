import MuiLink from "@mui/material/Link";

import "./Link.css";

import type { LinkProps } from "./Link.types";

export function Link({
  id,
  href,
  label,
  iconUrl,
  invalidAccessibility: invalid = false,
}: LinkProps) {
  const showIcon = Boolean(iconUrl);
  const useLabel = Boolean(label) && !invalid && !showIcon;

  return (
    <MuiLink
      data-component="Link"
      data-source-file={import.meta.url}
      id={id}
      href={href}
      underline="hover"
      color="primary"
    >
      {useLabel && label}

      {showIcon && (
        <img
          src={iconUrl}
          alt={invalid ? undefined : ""}
          aria-hidden={invalid ? undefined : true}
          width={16}
          height={16}
          className="link-icon"
        />
      )}
    </MuiLink>
  );
}
