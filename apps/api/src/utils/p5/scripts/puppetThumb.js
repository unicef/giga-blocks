const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch(
    {
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      defaultViewport: { width: 2000, height: 2400} 
    });
  const page = await browser.newPage();


 page
    .on('console', message =>
      console.log(`${message.type().substr(0, 3).toUpperCase()} ${message.text()}`))
    .on('pageerror', ({ message }) => console.log(message))
    .on('response', response =>
      console.log(`${response.status()} ${response.url()}`))
    .on('requestfailed', request =>
      console.log(`${request.failure().errorText} ${request.url()}`))
  
  await page.goto('http://127.0.0.1:5501/indextest.html');
  await page.screenshot({path: 'puppet_thumb.png'});

  await browser.close();
})();