const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  
  // 1. Light mode
  const ctx1 = await browser.newContext({ viewport: { width: 1400, height: 900 } });
  const page1 = await ctx1.newPage();
  await page1.addInitScript(() => localStorage.setItem('rewamp-theme', 'light'));
  await page1.goto('http://localhost:5173/components/hexagon-mesh-hover');
  await page1.waitForTimeout(1000);
  await page1.screenshot({ path: 'hex_light_verify.png' });
  await ctx1.close();

  // 2. Dark mode
  const ctx2 = await browser.newContext({ viewport: { width: 1400, height: 900 } });
  const page2 = await ctx2.newPage();
  await page2.addInitScript(() => localStorage.setItem('rewamp-theme', 'dark'));
  await page2.goto('http://localhost:5173/components/hexagon-mesh-hover');
  await page2.waitForTimeout(1000);
  await page2.screenshot({ path: 'hex_dark_verify.png' });
  await ctx2.close();

  await browser.close();
  console.log('Done capturing hex_light_verify.png and hex_dark_verify.png');
})();
