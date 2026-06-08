import { writeFileSync } from "node:fs";
import ora from "ora";

import { analyzeDom } from "./analyze/analyzeDom.js";
import { captureDom } from "./capture/captureDom.js";
import { formatJsonReport } from "./report/formatJsonReport.js";
import { formatReport } from "./report/formatReport.js";
import { groupViolations } from "./report/groupViolations.js";
import {
  formatApplicationFound,
  formatSuccessSummary,
  formatSummary,
  theme,
} from "./utils/terminalTheme.js";

const APP_URL = "http://localhost:5173";

function getOutputPath(): string | null {
  for (let index = 2; index < process.argv.length; index += 1) {
    const arg = process.argv[index];

    if (arg === "--output" || arg === "-o") {
      return process.argv[index + 1] ?? null;
    }

    if (arg.startsWith("--output=")) {
      return arg.slice("--output=".length) || null;
    }
  }

  return null;
}

function isJsonMode(): boolean {
  return process.argv.includes("--json");
}

async function main(): Promise<void> {
  const jsonMode = isJsonMode();
  const outputPath = getOutputPath();

  if (outputPath !== null && !outputPath) {
    throw new Error("Missing path for --output.");
  }

  if (outputPath && !jsonMode) {
    throw new Error("--output requires --json.");
  }

  const spinner = ora({
    text: `Capturing DOM from ${APP_URL}...`,
    color: "cyan",
    isSilent: jsonMode,
  }).start();

  let html: string;

  try {
    html = await captureDom(APP_URL);
    spinner.succeed(formatApplicationFound(APP_URL));
  } catch (error) {
    spinner.fail(theme.error("Failed to capture DOM."));
    throw error;
  }

  const violations = analyzeDom(html);
  const reports = groupViolations(violations);
  const exitCode = violations.length > 0 ? 1 : 0;

  if (jsonMode) {
    const json = formatJsonReport(APP_URL, violations, reports);

    if (outputPath) {
      writeFileSync(outputPath, json, "utf8");
      console.error(theme.success(`✔ Report written to ${outputPath}`));
    } else {
      process.stdout.write(json);
    }

    process.exit(exitCode);
  }

  console.log(theme.success("✔ DOM captured successfully."));
  console.log("");

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
