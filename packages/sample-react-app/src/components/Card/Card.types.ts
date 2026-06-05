import type { WithInvalidA11y } from "../shared.types";

export type CardProps = WithInvalidA11y & {
  title: string;
  src: string;
  caption: string;
  alt?: string;
  className?: string;
};
