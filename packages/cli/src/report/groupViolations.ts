import { RULE_HINTS, RULE_LABELS } from "../rules/ruleLabels.js";
import type { ComponentReport, Violation } from "../types.js";

export function groupViolations(violations: Violation[]): ComponentReport[] {
  const reports = new Map<
    string,
    ComponentReport & {
      instanceKeys: Set<string>;
      ruleInstances: Map<
        Violation["ruleId"],
        Map<string, { id: string | null; label: string; usageFile: string | null }>
      >;
    }
  >();

  for (const violation of violations) {
    const reportKey = `${violation.componentName}::${violation.componentSourceFile}`;

    if (!reports.has(reportKey)) {
      reports.set(reportKey, {
        name: violation.componentName,
        sourceFile: violation.componentSourceFile,
        instanceCount: 0,
        rules: [],
        instanceKeys: new Set<string>(),
        ruleInstances: new Map(),
      });
    }

    const report = reports.get(reportKey)!;
    report.instanceKeys.add(violation.instanceKey);

    if (!report.ruleInstances.has(violation.ruleId)) {
      report.ruleInstances.set(violation.ruleId, new Map());
    }

    const instances = report.ruleInstances.get(violation.ruleId)!;

    if (!instances.has(violation.instanceKey)) {
      instances.set(violation.instanceKey, {
        id: violation.id,
        label: violation.instanceLabel,
        usageFile: violation.usageFile,
      });
    }
  }

  return Array.from(reports.values())
    .map((report) => ({
      name: report.name,
      sourceFile: report.sourceFile,
      instanceCount: report.instanceKeys.size,
      rules: Array.from(report.ruleInstances.entries()).map(
        ([ruleId, instances]) => ({
          label: RULE_LABELS[ruleId],
          hint: RULE_HINTS[ruleId],
          instances: Array.from(instances.values()),
        }),
      ),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
