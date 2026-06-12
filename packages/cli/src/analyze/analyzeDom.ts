import { JSDOM } from "jsdom";

import type { Violation } from "../types.js";
import { findDuplicateIdElements } from "../rules/duplicateId.js";
import { hasMissingAccessibleName } from "../rules/missingAccessibleName.js";
import { hasMissingLabel } from "../rules/missingLabel.js";
import { hasMissingAlt } from "../rules/missingAlt.js";
import {
  hasInvalidAriaDescribedby,
  hasInvalidAriaLabelledby,
} from "../utils/ariaReferences.js";
import {
  findUsageFile,
  getComponentContext,
  getComponentId,
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
    id: getComponentId(context.root),
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

  for (const element of document.querySelectorAll(
    "button, [role='button'], a[href], input, textarea, select",
  )) {
    if (hasMissingAccessibleName(element, document)) {
      const violation = createViolation("missing-accessible-name", element);

      if (violation) {
        violations.push(violation);
      }
    }
  }

  for (const element of document.querySelectorAll(
    "input, textarea, select",
  )) {
    if (hasMissingLabel(element, document)) {
      const violation = createViolation("missing-label", element);

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

  for (const element of document.querySelectorAll("[aria-labelledby]")) {
    if (hasInvalidAriaLabelledby(element, document)) {
      const violation = createViolation("invalid-aria-labelledby", element);

      if (violation) {
        violations.push(violation);
      }
    }
  }

  for (const element of document.querySelectorAll("[aria-describedby]")) {
    if (hasInvalidAriaDescribedby(element, document)) {
      const violation = createViolation("invalid-aria-describedby", element);

      if (violation) {
        violations.push(violation);
      }
    }
  }

  const reportedDuplicateIds = new Set<string>();

  for (const element of findDuplicateIdElements(document)) {
    const violation = createViolation("duplicate-id", element);

    if (!violation) {
      continue;
    }

    const dedupeKey = `${violation.componentName}::${violation.instanceKey}`;

    if (reportedDuplicateIds.has(dedupeKey)) {
      continue;
    }

    reportedDuplicateIds.add(dedupeKey);
    violations.push(violation);
  }

  return violations;
}
