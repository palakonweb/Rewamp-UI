const { chromium } = require('playwright');
const path = require('path');

async function testAll() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('1. Testing /components/halftone-pixel-background ...');
  await page.goto('http://localhost:5173/components/halftone-pixel-background');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.resolve('public', 'verify_halftone_bg.png') });

  console.log('2. Testing /components/flower-sidebar ...');
  await page.goto('http://localhost:5173/components/flower-sidebar');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.resolve('public', 'verify_flower_sidebar.png') });

  console.log('3. Testing /components/sidebar ...');
  await page.goto('http://localhost:5173/components/sidebar');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.resolve('public', 'verify_sidebar_final.png') });

  console.log('4. Testing switching slug to see shimmer skeleton ...');
  const comp = await page.$('text=Googly Eyes Button');
  if (comp) {
    await comp.click();
    await page.waitForTimeout(60);
    await page.screenshot({ path: path.resolve('public', 'verify_shimmer_skeleton.png') });
  }

  await browser.close();
  console.log('All screenshots captured successfully!');
}

testAll().catch(console.error);
