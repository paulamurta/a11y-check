import { chromium } from "playwright";

const APP_URL = "http://localhost:5173";

async function main(): Promise<void> {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    const response = await page.goto(APP_URL, {
      waitUntil: "networkidle",
    });

    if (!response || !response.ok()) {
      throw new Error(
        `Could not reach ${APP_URL}. Make sure the dev server is running.`,
      );
    }

    console.log("Application found.");
    console.log("Capturing DOM...");

    await page.content();

    console.log("DOM captured successfully.");
  } finally {
    await browser.close();
  }
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exit(1);
});
