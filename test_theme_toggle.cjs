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

  await page.waitForTimeout(1800);

  const outDir = 'C:\\Users\\Hp\\.gemini\\antigravity-ide\\brain\\967fbd0f-68ba-4bbc-bcab-6b088fba8656';

  // 1. Initial Light Mode with ThemeToggle
  await page.screenshot({ path: path.join(outDir, 'theme_toggle_light.png'), fullPage: false });
  console.log('Saved theme_toggle_light.png');

  // 2. Click the ThemeToggle switch
  const toggle = page.locator('button[role="switch"]');
  console.log('Toggle count:', await toggle.count());
  if (await toggle.count() > 0) {
    await toggle.first().click();
    await page.waitForTimeout(600); // let 0.35s transition settle
    await page.screenshot({ path: path.join(outDir, 'theme_toggle_dark.png'), fullPage: false });
    console.log('Saved theme_toggle_dark.png');

    // 3. Test keyboard focus
    await toggle.first().focus();
    await page.screenshot({ path: path.join(outDir, 'theme_toggle_focus.png'), fullPage: false });
    console.log('Saved theme_toggle_focus.png');

    // 4. Toggle back to light via keyboard (Space)
    await page.keyboard.press('Space');
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(outDir, 'theme_toggle_toggled_back.png'), fullPage: false });
    console.log('Saved theme_toggle_toggled_back.png');
  }

  await browser.close();
})();
