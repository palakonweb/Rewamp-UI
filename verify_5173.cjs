const { chromium } = require('playwright');
const path = require('path');

async function test5173() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push(e.message));

  console.log('Testing 5173 /components/sidebar ...');
  await page.goto('http://localhost:5173/components/sidebar');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.resolve('public', 'verify_5173_sidebar.png') });

  console.log('Testing 5173 /components/halftone-pixel-background ...');
  await page.goto('http://localhost:5173/components/halftone-pixel-background');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.resolve('public', 'verify_5173_halftone.png') });

  console.log('Testing 5173 /components/flower-sidebar ...');
  await page.goto('http://localhost:5173/components/flower-sidebar');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.resolve('public', 'verify_5173_flower.png') });

  console.log('Testing clicking items on 5173...');
  const btn = await page.locator('text=Googly Eyes Button').first();
  if (btn) {
    await btn.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.resolve('public', 'verify_5173_click_googly.png') });
  }

  console.log('Errors caught on 5173:', errors);
  await browser.close();
}

test5173().catch(console.error);
