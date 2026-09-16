const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:5174/components ...');
  await page.goto('http://localhost:5174/components', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3800);

  const outDir = 'C:\\Users\\Hp\\.gemini\\antigravity-ide\\brain\\967fbd0f-68ba-4bbc-bcab-6b088fba8656';
  await page.screenshot({ path: path.join(outDir, 'rareui_clone_initial.png'), fullPage: false });

  console.log('Screenshot saved to rareui_clone_initial.png');
  await browser.close();
})();
