export type RuleId = "missing-accessible-name" | "missing-alt";

export type Violation = {
  ruleId: RuleId;
  componentName: string;
  componentSourceFile: string;
  instanceKey: string;
  id: string | null;
  instanceLabel: string;
  usageFile: string | null;
};

export type RuleReport = {
  label: string;
  hint: string;
  instances: {
    id: string | null;
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
