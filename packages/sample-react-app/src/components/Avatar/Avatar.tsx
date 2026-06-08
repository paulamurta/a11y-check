import MuiAvatar from "@mui/material/Avatar";

import type { AvatarProps } from "./Avatar.types";

export function Avatar({
  id,
  src,
  alt,
  invalidAccessibility: invalid = false,
}: AvatarProps) {
  return (
    <MuiAvatar
      data-component="Avatar"
      data-source-file={import.meta.url}
      id={id}
      src={src}
      alt={invalid ? undefined : alt}
      sx={{ width: 56, height: 56 }}
    />
  );
}
