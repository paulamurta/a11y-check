import type { ComponentReport } from "../types.js";
import { theme } from "../utils/terminalTheme.js";

function formatInstanceHeader(instance: ComponentReport["instances"][number]): string {
  const idPrefix = instance.id
    ? `${theme.accent(`[${instance.id}]`)} `
    : "";

  const lines = [`${idPrefix}${theme.instance(instance.label)}`];

  if (instance.usageFile) {
    lines.push(`  ${theme.muted(instance.usageFile)}`);
  }

  return lines.join("\n");
}

function formatComponentReport(report: ComponentReport): string {
  const lines = [
    theme.component(`▸ ${report.name}`),
    theme.muted(`  ${report.sourceFile}`),
    "",
    theme.error(`✖ Instances with error: ${report.instancesWithError}`),
    theme.error(`✖ Distinct issues: ${report.distinctIssues}`),
    "",
  ];

  for (const instance of report.instances) {
    lines.push(formatInstanceHeader(instance));
    lines.push(`  ${theme.muted("Problems:")}`);

    for (const problem of instance.problems) {
      lines.push(
        `  ${theme.muted("•")} ${theme.rule(problem.label)} ${theme.muted(`— ${problem.hint}`)}`,
      );
    }

    lines.push("");
  }

  return lines.join("\n").trimEnd();
}

export function formatReport(reports: ComponentReport[]): string {
  if (reports.length === 0) {
    return "";
  }

  return reports.map(formatComponentReport).join(
    `\n\n${theme.separator("─".repeat(48))}\n\n`,
  );
}
