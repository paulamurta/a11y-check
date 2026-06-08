import type { ComponentReport } from "../types.js";
import { theme } from "../utils/terminalTheme.js";

function formatInstance(instance: {
  id: string | null;
  label: string;
  usageFile: string | null;
}): string {
  const idPrefix = instance.id
    ? `${theme.accent(`[${instance.id}]`)} `
    : "";

  const lines = [
    `  ${theme.muted("•")} ${idPrefix}${theme.instance(instance.label)}`,
  ];

  if (instance.usageFile) {
    lines.push(`    ${theme.muted(instance.usageFile)}`);
  }

  return lines.join("\n");
}

function formatComponentReport(report: ComponentReport): string {
  const lines = [
    theme.component(`▸ ${report.name}`),
    theme.muted(`  ${report.sourceFile}`),
    "",
    theme.error(`✖ ${report.instanceCount} instance(s) with error`),
    "",
  ];

  for (const rule of report.rules) {
    lines.push(
      `${theme.rule("•")} ${theme.rule(rule.label)} ${theme.muted(`— ${rule.hint}`)}`,
      "",
    );

    for (const instance of rule.instances) {
      lines.push(formatInstance(instance));
      lines.push("");
    }
  }

  return lines.join("\n").trimEnd();
}

export function formatReport(reports: ComponentReport[]): string {
  if (reports.length === 0) {
    return theme.success("✔ No accessibility issues found.");
  }

  const body = reports.map(formatComponentReport).join(
    `\n\n${theme.separator("─".repeat(48))}\n\n`,
  );

  return body;
}
