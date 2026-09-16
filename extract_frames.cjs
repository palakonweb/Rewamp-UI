const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <body style="margin: 0; background: #222; display: flex; align-items: center; justify-content: center; height: 100vh;">
        <video id="vid" src="http://localhost:5174/Recording%202026-09-15%20212315.mp4" style="max-width: 90vw; max-height: 90vh;" muted playsinline></video>
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
    return v.duration;
  });
  
  console.log('Video duration:', duration);
  
  const outDir = path.resolve('public', 'frames');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  
  const steps = 10;
  for (let i = 0; i <= steps; i++) {
    const time = (duration * i) / steps;
    await page.evaluate((t) => {
      const v = document.getElementById('vid');
      v.currentTime = t;
      return new Promise(res => {
        v.onseeked = () => res();
      });
    }, time);
    
    // wait a moment for render
    await page.waitForTimeout(100);
    const framePath = path.join(outDir, `frame_${i}.png`);
    const element = await page.$('#vid');
    await element.screenshot({ path: framePath });
    console.log(`Saved frame ${i} at ${time.toFixed(2)}s`);
  }
  
  await browser.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
