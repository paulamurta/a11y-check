import { chromium } from "playwright";

export async function captureDom(url: string): Promise<string> {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    const response = await page.goto(url, {
      waitUntil: "networkidle",
    });

    if (!response || !response.ok()) {
      throw new Error(
        `Could not reach ${url}. Make sure the dev server is running.`,
      );
    }

    return await page.content();
  } finally {
    await browser.close();
  }
}
