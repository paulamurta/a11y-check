import type { RuleId } from "../types.js";

export const RULE_LABELS: Record<RuleId, string> = {
  "missing-accessible-name": "Missing accessible name",
  "missing-alt": "Missing or generic alt",
  "duplicate-id": "Duplicate id",
  "invalid-aria-labelledby": "Invalid aria-labelledby",
  "invalid-aria-describedby": "Invalid aria-describedby",
};

export const RULE_HINTS: Record<RuleId, string> = {
  "missing-accessible-name":
    "Add a visible label, aria-label, or aria-labelledby",
  "missing-alt": "Use a descriptive alt attribute",
  "duplicate-id": "Use a unique id for each element in the document",
  "invalid-aria-labelledby":
    "Point aria-labelledby to existing element ids in the document",
  "invalid-aria-describedby":
    "Point aria-describedby to existing element ids in the document",
};
