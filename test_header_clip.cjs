const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  let url = 'http://localhost:5174/components';
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 5000 });
  } catch (e) {
    url = 'http://localhost:5173/components';
    await page.goto(url, { waitUntil: 'domcontentloaded' });
  }
  await page.waitForTimeout(1500);

  const outDir = 'C:\\Users\\Hp\\.gemini\\antigravity-ide\\brain\\967fbd0f-68ba-4bbc-bcab-6b088fba8656';

  // Crop only the top of the sidebar for clear comparison
  const sidebar = page.locator('aside');
  if (await sidebar.count() > 0) {
    const box = await sidebar.boundingBox();
    if (box) {
      await page.screenshot({
        path: path.join(outDir, 'header_current.png'),
        clip: { x: box.x, y: box.y, width: box.width, height: 120 }
      });
      console.log('Saved header_current.png');
    }
  }

  await browser.close();
})();
