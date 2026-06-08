export type RuleId = "missing-accessible-name" | "missing-alt";

export type Violation = {
  ruleId: RuleId;
  componentName: string;
  componentSourceFile: string;
  instanceKey: string;
  instanceLabel: string;
  usageFile: string | null;
};

export type RuleReport = {
  label: string;
  instances: {
    label: string;
    usageFile: string | null;
  }[];
};

export type ComponentReport = {
  name: string;
  sourceFile: string;
  instanceCount: number;
  rules: RuleReport[];
};
