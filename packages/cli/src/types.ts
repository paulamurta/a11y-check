export type RuleId =
  | "missing-accessible-name"
  | "missing-alt"
  | "duplicate-id"
  | "invalid-aria-labelledby"
  | "invalid-aria-describedby";

export type Violation = {
  ruleId: RuleId;
  componentName: string;
  componentSourceFile: string;
  instanceKey: string;
  id: string | null;
  instanceLabel: string;
  usageFile: string | null;
};

export type InstanceProblem = {
  label: string;
  hint: string;
};

export type InstanceReport = {
  id: string | null;
  label: string;
  usageFile: string | null;
  problems: InstanceProblem[];
};

export type ComponentReport = {
  name: string;
  sourceFile: string;
  instancesWithError: number;
  distinctIssues: number;
  instances: InstanceReport[];
};
