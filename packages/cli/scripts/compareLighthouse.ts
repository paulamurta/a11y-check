import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

import type { RuleId } from "../src/types.js";
import { theme } from "../src/utils/terminalTheme.js";

type A11yCheckReport = {
  byRule: Record<RuleId, number>;
  summary: {
    componentsWithIssues: number;
    distinctIssues: number;
  };
};

type LighthouseAudit = {
  score: number | null;
  title: string;
  details?: {
    items?: unknown[];
  };
};

type LighthouseReport = {
  audits: Record<string, LighthouseAudit>;
  categories: {
    accessibility: {
      score: number;
    };
  };
};

type ComparisonRow = {
  rule: string;
  lighthouse: number | null;
  a11yCheck: number | null;
  lighthouseAudits: string[];
  notes: string;
};

const RULE_ROWS: {
  rule: string;
  a11yRuleId?: RuleId;
  lighthouseAudits: string[];
  notes: string;
}[] = [
  {
    rule: "Missing accessible name",
    a11yRuleId: "missing-accessible-name",
    lighthouseAudits: ["button-name", "link-name"],
    notes: "Lighthouse splits buttons and links; a11y-check uses one rule.",
  },
  {
    rule: "Missing or generic alt",
    a11yRuleId: "missing-alt",
    lighthouseAudits: ["image-alt"],
    notes: "a11y-check also flags generic alt text and decorative icons.",
  },
  {
    rule: "Missing label",
    a11yRuleId: "missing-label",
    lighthouseAudits: ["label"],
    notes: "Form controls without label, aria-label, or valid aria-labelledby.",
  },
  {
    rule: "Invalid aria-labelledby",
    a11yRuleId: "invalid-aria-labelledby",
    lighthouseAudits: ["aria-valid-attr-value"],
    notes: "a11y-check validates referenced ids; Lighthouse did not fail this audit.",
  },
  {
    rule: "Invalid aria-describedby",
    a11yRuleId: "invalid-aria-describedby",
    lighthouseAudits: ["aria-valid-attr-value"],
    notes: "Same Lighthouse audit covers both ARIA attributes.",
  },
  {
    rule: "Duplicate id",
    a11yRuleId: "duplicate-id",
    lighthouseAudits: ["duplicate-id-aria"],
    notes: "Tools use different scopes and counting strategies.",
  },
];

function countFailedItems(audit: LighthouseAudit | undefined): number {
  if (!audit || audit.score === null || audit.score >= 1) {
    return 0;
  }

  return audit.details?.items?.length ?? 0;
}

function sumLighthouseCounts(
  audits: Record<string, LighthouseAudit>,
  auditIds: string[],
): number {
  return auditIds.reduce(
    (total, auditId) => total + countFailedItems(audits[auditId]),
    0,
  );
}

function loadJson<T>(path: string): T {
  return JSON.parse(readFileSync(path, "utf8")) as T;
}

function classify(row: ComparisonRow): string {
  const lighthouse = row.lighthouse ?? 0;
  const a11yCheck = row.a11yCheck ?? 0;

  if (row.a11yCheck === null) {
    return lighthouse > 0 ? "Lighthouse only" : "Not comparable";
  }

  if (lighthouse === 0 && a11yCheck > 0) {
    return "a11y-check only";
  }

  if (lighthouse > 0 && a11yCheck > 0) {
    return lighthouse === a11yCheck ? "Match" : "Both found issues";
  }

  return "No issues";
}

export function compareReports(
  a11yPath: string,
  lighthousePath: string,
): {
  generatedAt: string;
  lighthouseAccessibilityScore: number;
  a11yCheckSummary: A11yCheckReport["summary"];
  rows: ComparisonRow[];
  classifications: Record<string, string>;
} {
  const a11y = loadJson<A11yCheckReport>(a11yPath);
  const lighthouse = loadJson<LighthouseReport>(lighthousePath);

  const rows = RULE_ROWS.map((definition) => ({
    rule: definition.rule,
    lighthouse: sumLighthouseCounts(
      lighthouse.audits,
      definition.lighthouseAudits,
    ),
    a11yCheck: definition.a11yRuleId
      ? a11y.byRule[definition.a11yRuleId]
      : null,
    lighthouseAudits: definition.lighthouseAudits,
    notes: definition.notes,
  }));

  const classifications = Object.fromEntries(
    rows.map((row) => [row.rule, classify(row)]),
  );

  return {
    generatedAt: new Date().toISOString(),
    lighthouseAccessibilityScore: lighthouse.categories.accessibility.score,
    a11yCheckSummary: a11y.summary,
    rows,
    classifications,
  };
}

function formatMarkdownTable(rows: ComparisonRow[]): string {
  const header = "| Rule | Lighthouse | a11y-check | Result |";
  const separator = "|------|------------|------------|--------|";
  const body = rows.map((row) => {
    const lighthouse =
      row.lighthouse === null ? "—" : String(row.lighthouse);
    const a11yCheck = row.a11yCheck === null ? "—" : String(row.a11yCheck);

    return `| ${row.rule} | ${lighthouse} | ${a11yCheck} | ${classify(row)} |`;
  });

  return [header, separator, ...body].join("\n");
}

function formatCount(value: number | null): string {
  return value === null ? "—" : String(value);
}

function formatResultLabel(result: string): string {
  if (result === "Match") {
    return theme.success(result);
  }

  if (result === "Both found issues") {
    return theme.rule(result);
  }

  if (result === "a11y-check only") {
    return theme.accent(result);
  }

  if (result === "Lighthouse only") {
    return theme.component(result);
  }

  return theme.muted(result);
}

function formatTerminalReport(
  comparison: ReturnType<typeof compareReports>,
): string {
  const width = 48;
  const separator = theme.separator("─".repeat(width));
  const lines = [
    "",
    separator,
    "",
    theme.accent("Lighthouse vs a11y-check"),
    "",
    `${theme.muted("Lighthouse accessibility score:")} ${theme.accent(String(Math.round(comparison.lighthouseAccessibilityScore * 100)))}`,
    `${theme.muted("a11y-check distinct issues:")} ${theme.accent(String(comparison.a11yCheckSummary.distinctIssues))}`,
    `${theme.muted("a11y-check components with issues:")} ${theme.accent(String(comparison.a11yCheckSummary.componentsWithIssues))}`,
    "",
  ];

  for (const row of comparison.rows) {
    const result = classify(row);

    lines.push(theme.component(`▸ ${row.rule}`));
    lines.push(
      `  ${theme.muted("Lighthouse:")} ${theme.instance(formatCount(row.lighthouse))}`,
    );
    lines.push(
      `  ${theme.muted("a11y-check:")} ${theme.instance(formatCount(row.a11yCheck))}`,
    );
    lines.push(`  ${theme.muted("Result:")} ${formatResultLabel(result)}`);
    lines.push("");
  }

  lines.push(separator);
  lines.push("");
  lines.push(
    theme.success("✔ Written comparison.json and comparison.md"),
  );
  lines.push("");

  return lines.join("\n");
}

function main(): void {
  const cwd = process.cwd();
  const a11yPath = resolve(cwd, "a11y-check.json");
  const lighthousePath = resolve(cwd, "lighthouse.json");
  const comparison = compareReports(a11yPath, lighthousePath);

  writeFileSync(
    resolve(cwd, "comparison.json"),
    `${JSON.stringify(comparison, null, 2)}\n`,
    "utf8",
  );

  writeFileSync(
    resolve(cwd, "comparison.md"),
    `# Lighthouse vs a11y-check

Generated from \`lighthouse.json\` and \`a11y-check.json\`.

- Lighthouse accessibility score: **${Math.round(comparison.lighthouseAccessibilityScore * 100)}**
- a11y-check distinct issues: **${comparison.a11yCheckSummary.distinctIssues}**
- a11y-check components with issues: **${comparison.a11yCheckSummary.componentsWithIssues}**

## Comparison table

${formatMarkdownTable(comparison.rows)}

## Notes

${comparison.rows.map((row) => `- **${row.rule}:** ${row.notes}`).join("\n")}

## How to read the results

- **Match** — both tools found the same number of issues for that rule mapping.
- **Both found issues** — both tools reported problems, but counts differ because of scope or rule strictness.
- **a11y-check only** — custom rules or stricter checks not reflected in Lighthouse failures.
- **Lighthouse only** — audit exists in Lighthouse but not in a11y-check.
- **Not comparable** — neither tool reported issues for that mapping in this run.
`,
    "utf8",
  );

  console.log(formatTerminalReport(comparison));
}

main();
