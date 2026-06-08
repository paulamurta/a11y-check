import { analyzeDom } from "./analyze/analyzeDom.js";
import { captureDom } from "./capture/captureDom.js";
import { formatReport } from "./report/formatReport.js";
import { groupViolations } from "./report/groupViolations.js";

const APP_URL = "http://localhost:5173";

async function main(): Promise<void> {
  console.log("Capturing DOM...");

  const html = await captureDom(APP_URL);

  console.log("Application found.");
  console.log("DOM captured successfully.");
  console.log("");

  const violations = analyzeDom(html);
  const reports = groupViolations(violations);

  console.log(formatReport(reports));

  if (violations.length > 0) {
    process.exit(1);
  }
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exit(1);
});
