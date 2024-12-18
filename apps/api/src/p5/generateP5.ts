import { ContractTransactionResponse } from 'ethers';
import puppeteer from 'puppeteer';

interface scriptData {
  tokenId: number;
  nftcontents:any;
  baseImage1: string;
  baseImage2: string;
}

async function generateP5Image(
  p5Script: string | ContractTransactionResponse,
  scriptData: scriptData,
) {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: true,
  });
  //need to update the external variables
  const page = await browser.newPage();
  const tokenNumber = Number(scriptData.tokenId);
  const baseImage1_value = scriptData.baseImage1;
  const baseImage2_value = scriptData.baseImage2;
  const connectivity_value = scriptData.nftcontents.connectivity;
  const coverage_availability_value = scriptData.nftcontents.coverage_availabitlity;
  const electricity_availability_value = scriptData.nftcontents.electricity_availability;

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
      let baseImage1_value = "${baseImage1_value}";
      let baseImage2_value = "${baseImage2_value}";
      let tokenNumber = ${tokenNumber};
      let connectivity_value = "${connectivity_value}";
      let coverage_availability_value = "${coverage_availability_value}";
      let electricity_availability_value = "${electricity_availability_value}";
        ${p5Script}
      </script>
    </body>
    </html>`;

  await page.setContent(dataUrl, { waitUntil: 'domcontentloaded' });

  await page.setViewport({ width: 400, height: 400 });

  const screenshot = await page.screenshot({ encoding: 'base64' });

  await browser.close();

  return screenshot;
}

export default generateP5Image;
