const { chromium } = require('playwright');
const path = require('path');

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

  // Toggle dark mode
  const themeBtn = page.locator('button[title*="mode"]');
  if (await themeBtn.count() > 0) {
    await themeBtn.click();
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(outDir, 'flower_sidebar_dark_mode.png'), fullPage: false });
    console.log('Saved flower_sidebar_dark_mode.png');
  }

  // Search for an AI component e.g. "Marbled Fluid Orb"
  const searchInput = page.locator('input[placeholder*="Search"]');
  await searchInput.fill('Fluid');
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, 'flower_sidebar_search.png'), fullPage: false });
  console.log('Saved flower_sidebar_search.png');

  // Click on "Marbled Fluid Orb"
  const orbBtn = page.locator('button:has-text("Marbled Fluid Orb")');
  if (await orbBtn.count() > 0) {
    await orbBtn.click();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(outDir, 'canvas_orb_dark.png'), fullPage: false });
    console.log('Saved canvas_orb_dark.png');
  }

  // Open code drawer
  const codeBtn = page.locator('button[title="View code"]');
  if (await codeBtn.count() > 0) {
    await codeBtn.click();
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(outDir, 'canvas_code_drawer.png'), fullPage: false });
    console.log('Saved canvas_code_drawer.png');
  }

  await browser.close();
})();
