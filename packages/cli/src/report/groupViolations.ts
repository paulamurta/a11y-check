import { RULE_HINTS, RULE_LABELS } from "../rules/ruleLabels.js";
import type { ComponentReport, Violation } from "../types.js";

type MutableInstanceReport = {
  id: string | null;
  label: string;
  usageFile: string | null;
  problems: Map<Violation["ruleId"], { label: string; hint: string }>;
};

export function groupViolations(violations: Violation[]): ComponentReport[] {
  const reports = new Map<
    string,
    {
      name: string;
      sourceFile: string;
      distinctIssues: number;
      instances: Map<string, MutableInstanceReport>;
    }
  >();

  for (const violation of violations) {
    const reportKey = `${violation.componentName}::${violation.componentSourceFile}`;

    if (!reports.has(reportKey)) {
      reports.set(reportKey, {
        name: violation.componentName,
        sourceFile: violation.componentSourceFile,
        distinctIssues: 0,
        instances: new Map(),
      });
    }

    const report = reports.get(reportKey)!;
    report.distinctIssues += 1;

    if (!report.instances.has(violation.instanceKey)) {
      report.instances.set(violation.instanceKey, {
        id: violation.id,
        label: violation.instanceLabel,
        usageFile: violation.usageFile,
        problems: new Map(),
      });
    }

    const instance = report.instances.get(violation.instanceKey)!;

    if (!instance.problems.has(violation.ruleId)) {
      instance.problems.set(violation.ruleId, {
        label: RULE_LABELS[violation.ruleId],
        hint: RULE_HINTS[violation.ruleId],
      });
    }
  }

  return Array.from(reports.values())
    .map((report) => ({
      name: report.name,
      sourceFile: report.sourceFile,
      instancesWithError: report.instances.size,
      distinctIssues: report.distinctIssues,
      instances: Array.from(report.instances.values()).map((instance) => ({
        id: instance.id,
        label: instance.label,
        usageFile: instance.usageFile,
        problems: Array.from(instance.problems.values()),
      })),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
