import { RULE_LABELS } from "../rules/ruleLabels.js";
import type { ComponentReport, RuleId, Violation } from "../types.js";

export type JsonReport = {
  tool: "a11y-check";
  url: string;
  summary: {
    componentsWithIssues: number;
    distinctIssues: number;
  };
  byRule: Record<RuleId, number>;
  components: ComponentReport[];
};

function buildByRule(violations: Violation[]): Record<RuleId, number> {
  const counts = Object.fromEntries(
    Object.keys(RULE_LABELS).map((ruleId) => [ruleId, 0]),
  ) as Record<RuleId, number>;

  for (const violation of violations) {
    counts[violation.ruleId] += 1;
  }

  return counts;
}

export function formatJsonReport(
  url: string,
  violations: Violation[],
  reports: ComponentReport[],
): string {
  const payload: JsonReport = {
    tool: "a11y-check",
    url,
    summary: {
      componentsWithIssues: reports.length,
      distinctIssues: violations.length,
    },
    byRule: buildByRule(violations),
    components: reports,
  };

  return `${JSON.stringify(payload, null, 2)}\n`;
}
