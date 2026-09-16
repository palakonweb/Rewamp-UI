const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function verify() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('Navigating to http://localhost:5173/ ...');
  await page.goto('http://localhost:5173/');
  await page.waitForTimeout(1000);

  // Take screenshot of main page with Copy Prompt button & aligned top sidebar
  const mainPath = path.resolve('public', 'verify_main_showcase.png');
  await page.screenshot({ path: mainPath });
  console.log('Saved:', mainPath);

  // Trigger component switch to see the loading skeleton with halftone pixel background in light mode
  console.log('Triggering switch to capture skeleton in light mode...');
  // Click another component in the sidebar to start loading
  const compLink = await page.$('text=Googly Eyes Button');
  if (compLink) {
    await compLink.click();
    // Quickly capture skeleton frame
    await page.waitForTimeout(60);
    const skeletonLightPath = path.resolve('public', 'verify_skeleton_light.png');
    await page.screenshot({ path: skeletonLightPath });
    console.log('Saved:', skeletonLightPath);
  }

  await page.waitForTimeout(600);

  // Switch to dark mode
  console.log('Toggling dark mode...');
  const themeToggle = await page.$('[aria-label="Switch to dark mode"]');
  if (themeToggle) {
    await themeToggle.click();
    await page.waitForTimeout(300);
  } else {
    // Alternatively evaluate theme toggle
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('rewamp-theme', 'dark');
    });
    await page.reload();
    await page.waitForTimeout(800);
  }

  // Trigger component switch to capture dark mode skeleton
  const compLink2 = await page.$('text=Chrome Border Button');
  if (compLink2) {
    await compLink2.click();
    await page.waitForTimeout(60);
    const skeletonDarkPath = path.resolve('public', 'verify_skeleton_dark.png');
    await page.screenshot({ path: skeletonDarkPath });
    console.log('Saved:', skeletonDarkPath);
  }

  await page.waitForTimeout(800);

  // Navigate to sidebar component
  console.log('Navigating to http://localhost:5173/components/sidebar ...');
  await page.goto('http://localhost:5173/components/sidebar');
  await page.waitForTimeout(1000);

  const sidebarDarkPath = path.resolve('public', 'verify_sidebar_dark.png');
  await page.screenshot({ path: sidebarDarkPath });
  console.log('Saved:', sidebarDarkPath);

  // Switch to light mode and verify sidebar
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('rewamp-theme', 'light');
  });
  await page.reload();
  await page.waitForTimeout(1000);

  const sidebarLightPath = path.resolve('public', 'verify_sidebar_light.png');
  await page.screenshot({ path: sidebarLightPath });
  console.log('Saved:', sidebarLightPath);

  await browser.close();
  console.log('Verification completed successfully!');
}

verify().catch(console.error);
