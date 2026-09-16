const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function main() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  
  console.log('Navigating to http://localhost:5174/components/shimmer-button ...');
  await page.goto('http://localhost:5174/components/shimmer-button', { waitUntil: 'networkidle' });
  
  // Wait for button to be visible
  await page.waitForSelector('button:has-text("View Designs")');
  console.log('Found Shimmer Button!');

  const outDir = path.resolve('public', 'verification');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // 1. Full page screenshot
  await page.screenshot({ path: path.join(outDir, 'shimmer_button_page.png') });
  console.log('Saved shimmer_button_page.png');

  // 2. Element screenshot - idle / during shimmer sweep
  const btn = await page.$('button:has-text("View Designs")');
  await btn.screenshot({ path: path.join(outDir, 'shimmer_button_idle.png') });
  console.log('Saved shimmer_button_idle.png');

  // 3. Hover over button and screenshot
  await btn.hover();
  await page.waitForTimeout(350);
  await btn.screenshot({ path: path.join(outDir, 'shimmer_button_hover.png') });
  console.log('Saved shimmer_button_hover.png');

  // 4. Click button to see the notice and sheen
  await btn.click();
  await page.waitForTimeout(200);
  await page.screenshot({ path: path.join(outDir, 'shimmer_button_clicked.png') });
  console.log('Saved shimmer_button_clicked.png');

  await browser.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
