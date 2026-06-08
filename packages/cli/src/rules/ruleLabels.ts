import type { RuleId } from "../types.js";

export const RULE_LABELS: Record<RuleId, string> = {
  "missing-accessible-name": "Missing accessible name",
  "missing-alt": "Missing or generic alt",
};

export const RULE_HINTS: Record<RuleId, string> = {
  "missing-accessible-name":
    "Add a visible label, aria-label, or aria-labelledby",
  "missing-alt": "Use a descriptive alt attribute",
};
