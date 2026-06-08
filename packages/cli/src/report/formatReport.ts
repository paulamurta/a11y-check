import type { ComponentReport } from "../types.js";

function formatInstance(instance: {
  label: string;
  usageFile: string | null;
}): string {
  const lines = [`  * ${instance.label}`];

  if (instance.usageFile) {
    lines.push(`    ${instance.usageFile}`);
  }

  return lines.join("\n");
}

function formatComponentReport(report: ComponentReport): string {
  const lines = [
    `🧩 Component: <${report.name}>`,
    `📄 ${report.sourceFile}`,
    "",
    `✖ Instances with error: ${report.instanceCount}`,
    "",
  ];

  for (const rule of report.rules) {
    lines.push(`• ${rule.label}`, "");

    for (const instance of rule.instances) {
      lines.push(formatInstance(instance));
      lines.push("");
    }
  }

  return lines.join("\n").trimEnd();
}

export function formatReport(reports: ComponentReport[]): string {
  if (reports.length === 0) {
    return "No accessibility issues found.";
  }

  return reports.map(formatComponentReport).join("\n\n");
}
