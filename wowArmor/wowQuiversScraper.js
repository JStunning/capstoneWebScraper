const puppeteer = require('puppeteer');

async function wowQuiversScraper(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const h1 = await page.evaluate(() => 
    document.querySelector("h1").textContent
  )

  const items = await page.evaluate(() => 
    document.querySelectorAll("a.q4.listview-cleartext")[0].innerText
  )

  for(i = 0; i < items.length; i++){
    
  }

  console.log("h1 ", h1);
  console.log("items", items)

  browser.close();
}

wowQuiversScraper('https://classic.wowhead.com/quiver-items')