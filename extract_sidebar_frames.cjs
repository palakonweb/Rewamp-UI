const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <body style="margin: 0; background: #000; display: flex; align-items: center; justify-content: center; height: 100vh;">
        <video id="vid" src="http://localhost:5174/Recording%202026-09-15%20155640.mp4" style="max-width: 90vw; max-height: 90vh;" muted playsinline autoplay></video>
      </body>
    </html>
  `;
  
  await page.setContent(htmlContent);
  await page.waitForSelector('#vid');
  
  const duration = await page.evaluate(async () => {
    const v = document.getElementById('vid');
    if (v.readyState < 1) {
      await new Promise(res => v.addEventListener('loadedmetadata', res));
    }
    await v.play().catch(() => {});
    v.pause();
    return v.duration;
  });
  
  console.log('Video duration:', duration);
  
  const outDir = path.resolve('public', 'frames_sidebar');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  
  const steps = 14;
  for (let i = 0; i <= steps; i++) {
    const time = (duration * i) / steps;
    await page.evaluate((t) => {
      const v = document.getElementById('vid');
      v.currentTime = t;
      return new Promise(res => {
        v.onseeked = () => res();
      });
    }, time);
    
    await page.waitForTimeout(60);
    const framePath = path.join(outDir, `frame_${i}.png`);
    const element = await page.$('#vid');
    await element.screenshot({ path: framePath });
  }
  
  await browser.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
