import type { WithInvalidA11y, WithId } from "../shared.types";

export type LinkProps = WithInvalidA11y &
  WithId & {
    href: string;
    label?: string;
    iconUrl?: string;
  };
