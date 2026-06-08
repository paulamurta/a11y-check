import type { WithInvalidA11y, WithId } from "../shared.types";

export type AvatarProps = WithInvalidA11y &
  WithId & {
    src: string;
    alt?: string;
  };
