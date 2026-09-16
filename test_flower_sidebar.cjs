const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  // Try port 5174 first, then 5173 if needed
  let url = 'http://localhost:5174/components';
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 5000 });
  } catch (e) {
    url = 'http://localhost:5173/components';
    await page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  await page.waitForTimeout(2500);

  const outDir = 'C:\\Users\\Hp\\.gemini\\antigravity-ide\\brain\\967fbd0f-68ba-4bbc-bcab-6b088fba8656';
  await page.screenshot({ path: path.join(outDir, 'flower_sidebar_initial.png'), fullPage: false });
  console.log('Saved flower_sidebar_initial.png');

  // Click the Lilac swatch for the folder
  const lilacBtn = page.locator('button[title="Lilac (Brand)"]');
  if (await lilacBtn.count() > 0) {
    await lilacBtn.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(outDir, 'folder_lilac_swatch.png'), fullPage: false });
    console.log('Saved folder_lilac_swatch.png');
  }

  // Click a component lower down in the sidebar to verify flower movement and covered rail elongation
  const compButton = page.locator('button:has-text("Frosted Folder Card")');
  if (await compButton.count() > 0) {
    await compButton.click();
  } else {
    // Click any component
    const buttons = page.locator('aside button');
    const count = await buttons.count();
    if (count > 5) {
      await buttons.nth(5).click();
    }
  }

  await page.waitForTimeout(1800);
  await page.screenshot({ path: path.join(outDir, 'flower_sidebar_moved.png'), fullPage: false });
  console.log('Saved flower_sidebar_moved.png');

  await browser.close();
})();
