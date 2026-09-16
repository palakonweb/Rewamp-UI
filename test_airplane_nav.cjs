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

  // Click on "Ascii Matrix Hover"
  const asciiItem = page.locator('text=Ascii Matrix Hover').first();
  if (await asciiItem.count() > 0) {
    console.log('Clicking Ascii Matrix Hover...');
    await asciiItem.click();
    await page.waitForTimeout(1000);
  }

  const outDir = 'C:\\Users\\Hp\\.gemini\\antigravity-ide\\brain\\967fbd0f-68ba-4bbc-bcab-6b088fba8656';
  await page.screenshot({ path: path.join(outDir, 'rareui_airplane_clicked.png'), fullPage: false });

  // Now click on "Matte Folder Card" by searching
  const searchInput = page.locator('input[placeholder*="Search"]').first();
  await searchInput.fill('Folder');
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outDir, 'rareui_search_airplane.png'), fullPage: false });

  console.log('Screenshots saved!');
  await browser.close();
})();
