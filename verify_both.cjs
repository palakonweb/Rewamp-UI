const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  const outDir = 'C:/Users/Hp/.gemini/antigravity-ide/brain/967fbd0f-68ba-4bbc-bcab-6b088fba8656';

  // 1. Kinetic Lens Sidebar
  await page.goto('http://localhost:5174/components/kinetic-lens-sidebar', { waitUntil: 'networkidle', timeout: 8000 });
  await page.waitForTimeout(4000); // Allow splash screen to finish
  await page.screenshot({ path: `${outDir}/lens_centered.png` });

  // 2. Kinetic Reel Text
  await page.goto('http://localhost:5174/components/kinetic-reel-text', { waitUntil: 'networkidle', timeout: 8000 });
  await page.waitForTimeout(4000); // Allow splash screen to finish
  await page.screenshot({ path: `${outDir}/reel_centered.png` });

  await browser.close();
  console.log('Screenshots captured successfully after splash');
})();
