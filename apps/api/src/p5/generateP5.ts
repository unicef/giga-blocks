import { ContractTransactionResponse } from 'ethers';
import puppeteer from 'puppeteer';

interface scriptData {
  tokenId: number;
  nftcontents:any;
  baseImage1: string;
  baseImage2: string;
  tokenHash: string;
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
  const connectivity_value = scriptData.nftcontents.connectivity || true;
  const coverage_availability_value = scriptData.nftcontents.coverage_availabitlity || true;
  const electricity_availability_value = scriptData.nftcontents.electricity_availabilty || true;
  //need to identify the tokenData
  let tokenData:any ={};
  tokenData.hash = scriptData.tokenHash;
  tokenData.tokenId = Number(scriptData.tokenId);
  

  page
  // .on("console", (message) =>
  //   console.log(
  //     `${message.type().substr(0, 3).toUpperCase()} ${message.text()}`
  //   )
  // )
  // .on("pageerror", ({ message }) => console.log(message))
  // .on("response", (response) =>
  //   console.log(`${response.status()} ${response.url()}`)
  // )
  .on("requestfailed", (request:any) =>
    console.log(`${request.failure().errorText} ${request.url()}`)
  );

  const dataUrl = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
     <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.20/lodash.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/p5@1.2.0/lib/p5.js"></script>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
      <div id="sktchr" style="display: block; background-color: red;"></div>
      <script>
      let baseImage1_value = "${baseImage1_value}";
      let baseImage2_value = "${baseImage2_value}";
      let tokenNumber = ${tokenNumber};
      let connectivity_value = ${connectivity_value};
      let coverage_availability_value = ${coverage_availability_value};
      let electricity_availability_value = ${electricity_availability_value};
        ${p5Script}
      let tokenData = ${JSON.stringify(tokenData)};
      </script>
    </body>
    </html>`;

  await page.setContent(dataUrl, { waitUntil: 'domcontentloaded' });
  
 // Wait for the canvas to render
  await page.waitForTimeout(5000);

  // page.on("console", (message) =>
  //   console.log(
  //     `${message.type().substr(0, 3).toUpperCase()} ${message.text()}`
  //   )
  // )
  // page.on("pageerror", ({ message }) => console.log(message))
  // .on("response", (response) =>
  //   console.log(`${response.status()} ${response.url()}`)
  // )
  page.on("requestfailed", (request:any) =>
    console.log(`${request.failure().errorText} ${request.url()}`)
  );


  await page.setViewport({ width: 670, height: 800 });
  const screenshot = await page.screenshot({ encoding: 'base64' });

  await browser.close();

  return screenshot;
}

export default generateP5Image;
