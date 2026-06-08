import { JSDOM } from "jsdom";

import type { Violation } from "../types.js";
import { hasMissingAccessibleName } from "../rules/missingAccessibleName.js";
import { hasMissingAlt } from "../rules/missingAlt.js";
import {
  findUsageFile,
  getComponentContext,
} from "../utils/componentContext.js";
import { describeInstance } from "../utils/instanceLabel.js";
import {
  getInstanceKey,
  resetInstanceRegistry,
} from "../utils/instanceRegistry.js";

function createViolation(
  ruleId: Violation["ruleId"],
  targetElement: Element,
): Violation | null {
  const context = getComponentContext(targetElement);

  if (!context) {
    return null;
  }

  const instanceKey = getInstanceKey(context.root, context.name);

  return {
    ruleId,
    componentName: context.name,
    componentSourceFile: context.sourceFile,
    instanceKey,
    instanceLabel: describeInstance(
      context.root,
      context.name,
      targetElement,
    ),
    usageFile: findUsageFile(context.root),
  };
}

export function analyzeDom(html: string): Violation[] {
  resetInstanceRegistry();

  const { window } = new JSDOM(html);
  const { document } = window;
  const violations: Violation[] = [];

  for (const element of document.querySelectorAll("button, [role='button']")) {
    if (hasMissingAccessibleName(element, document)) {
      const violation = createViolation("missing-accessible-name", element);

      if (violation) {
        violations.push(violation);
      }
    }
  }

  for (const element of document.querySelectorAll("img")) {
    if (hasMissingAlt(element)) {
      const violation = createViolation("missing-alt", element);

      if (violation) {
        violations.push(violation);
      }
    }
  }

  return violations;
}
