const puppeteer = require('puppeteer');

async function scrapeProduct(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const [el] = await page.$x('//*[@id="imgBlkFront"]')
  const src = await el.getProperty('src')
  const image = await src.jsonValue();

  const [el2] = await page.$x('//*[@id="productTitle"]/text()')
  const txt = await el2.getProperty('textContent')
  const title = await txt.jsonValue();

  const [el3] = await page.$x('//*[@id="buyNewSection"]/h5/div/div[2]/div/span[2]')
  const txt2 = await el3.getProperty('textContent')
  const price = await txt2.jsonValue();

  console.log({image, title, price})

  browser.close();
}

scrapeProduct('https://www.amazon.com/Black-Swan-Improbable-Robustness-Fragility/dp/081297381X')