import puppeteer from 'puppeteer';

  async function generateP5Image(p5Script: string) {
    const browser = await puppeteer.launch({
      headless: 'new'
    });
    const page = await browser.newPage();

    const dataUrl = `
    <!DOCTYPE html>
<html lang="en">
<head>
  <script src="https://cdn.jsdelivr.net/npm/p5@1.9.0/lib/p5.js" defer></script>
  <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/dist/lodash.min.js"></script>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <div id="p5-container" style="display: block; background-color: red;"></div>
  <script>
    ${p5Script}
  </script>
</body>
</html>

    `;
  
    await page.setContent(dataUrl, { waitUntil: 'domcontentloaded' });

    await page.setViewport({ width: 400, height: 400 });

    const screenshot = await page.screenshot({ encoding: "base64" })

    await browser.close();

    return screenshot;
  }

  export default generateP5Image;

