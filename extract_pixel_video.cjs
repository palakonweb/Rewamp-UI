const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function extract() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const videoFile = path.resolve('public', 'Recording 2026-09-16 211818.mp4');
  console.log('Video exists?', fs.existsSync(videoFile), videoFile);

  const fileUrl = 'file:///' + videoFile.replace(/\\/g, '/');
  console.log('Opening:', fileUrl);

  await page.goto(fileUrl);
  await page.waitForTimeout(500);

  const duration = await page.evaluate(async () => {
    const v = document.querySelector('video');
    if (!v) return null;
    if (v.readyState < 1) {
      await new Promise(r => v.addEventListener('loadedmetadata', r));
    }
    return v.duration;
  });
  console.log('Duration:', duration);

  const outDir = path.resolve('public', 'frames_pixel_bg');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const count = 5;
  for (let i = 0; i < count; i++) {
    const time = ((duration || 3) * i) / (count - 1 || 1);
    await page.evaluate((t) => {
      const v = document.querySelector('video');
      if (v) {
        v.currentTime = t;
        return new Promise(r => { v.onseeked = r; });
      }
    }, time);
    await page.waitForTimeout(150);
    const framePath = path.join(outDir, `frame_${i}.png`);
    await page.screenshot({ path: framePath });
    console.log('Saved frame', i, framePath);
  }
  await browser.close();
}
extract().catch(console.error);
