import ora from "ora";

import { analyzeDom } from "./analyze/analyzeDom.js";
import { captureDom } from "./capture/captureDom.js";
import { formatReport } from "./report/formatReport.js";
import { groupViolations } from "./report/groupViolations.js";
import { formatApplicationFound, formatSuccessSummary, formatSummary, theme } from "./utils/terminalTheme.js";

const APP_URL = "http://localhost:5173";

async function main(): Promise<void> {
  const spinner = ora({
    text: `Capturing DOM from ${APP_URL}...`,
    color: "cyan",
  }).start();

  let html: string;

  try {
    html = await captureDom(APP_URL);
    spinner.succeed(formatApplicationFound(APP_URL));
  } catch (error) {
    spinner.fail(theme.error("Failed to capture DOM."));
    throw error;
  }

  console.log(theme.success("✔ DOM captured successfully."));
  console.log("");

  const violations = analyzeDom(html);
  const reports = groupViolations(violations);

  console.log(formatReport(reports));

  if (violations.length > 0) {
    console.log(formatSummary(reports.length, violations.length));
    process.exit(1);
  }

  console.log(formatSuccessSummary());
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(theme.error(message));
  process.exit(1);
});
