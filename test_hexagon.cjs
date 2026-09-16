const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  await page.goto('http://localhost:5173/components/hexagon-mesh-hover');
  await page.waitForTimeout(1000);
  
  // Find the theme toggle button in the top right dock
  // The theme toggle is inside role="switch"
  const switches = await page.locator('[role="switch"]').all();
  // There are 2 switches: one in BackgroundHeroOverlay ("Demo Content"), one in the top-right action dock (ThemeToggle)
  // Let's click the theme toggle (the second one or the one with aria-label="Toggle light and dark theme")
  const themeToggle = page.locator('[aria-label="Toggle light and dark theme"]');
  if (await themeToggle.count() > 0) {
    await themeToggle.click();
  }
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'hexagon_dark.png' });
  await browser.close();
  console.log('Saved hexagon_dark.png');
})();
