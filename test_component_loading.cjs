const { chromium } = require('playwright');

async function testErrors() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  page.on('pageerror', err => {
    errors.push(err.message);
  });

  console.log('Testing /components ...');
  await page.goto('http://localhost:5173/components');
  await page.waitForTimeout(1500);

  console.log('Testing /components/sidebar ...');
  await page.goto('http://localhost:5173/components/sidebar');
  await page.waitForTimeout(1500);

  console.log('Testing /components/pixel-snow-background ...');
  await page.goto('http://localhost:5173/components/pixel-snow-background');
  await page.waitForTimeout(1500);

  console.log('Errors caught:', errors);
  await browser.close();
}

testErrors().catch(console.error);
