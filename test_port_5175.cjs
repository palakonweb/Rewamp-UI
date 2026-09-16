const { chromium } = require('playwright');
const path = require('path');

async function testPorts() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // Try 5175 first since that is what task-2144 logged
  const baseUrl = 'http://localhost:5175';
  console.log('Testing', baseUrl, '...');

  await page.goto(`${baseUrl}/components/halftone-pixel-background`);
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.resolve('public', 'verify_halftone_bg_5175.png') });
  console.log('Saved halftone bg');

  await page.goto(`${baseUrl}/components/flower-sidebar`);
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.resolve('public', 'verify_flower_sidebar_5175.png') });
  console.log('Saved flower sidebar');

  await page.goto(`${baseUrl}/components/sidebar`);
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.resolve('public', 'verify_sidebar_final_5175.png') });
  console.log('Saved dock sidebar');

  // Trigger slug click to capture shimmer skeleton
  const comp = await page.$('text=Googly Eyes Button');
  if (comp) {
    await comp.click();
    await page.waitForTimeout(60);
    await page.screenshot({ path: path.resolve('public', 'verify_shimmer_skeleton_5175.png') });
    console.log('Saved shimmer skeleton');
  }

  await browser.close();
}

testPorts().catch(console.error);
