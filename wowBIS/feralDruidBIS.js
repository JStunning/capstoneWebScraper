const puppeteer = require('puppeteer');
const fs = require('fs');

const finalList = {}

async function wowScraper(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  let bisQ1 = await page.evaluate(() => {
    const nodelist = document.querySelectorAll(`a.q1.icontiny`);
    const arrayList = Array.from(nodelist);
    return arrayList.map(e => e.innerText)
  });

  let bisQ2 = await page.evaluate(() => {
    const nodelist = document.querySelectorAll(`a.q2.icontiny`);
    const arrayList = Array.from(nodelist);
    return arrayList.map(e => e.innerText)
  });

  let bisQ3 = await page.evaluate(() => {
    const nodelist = document.querySelectorAll(`a.q3.icontiny`);
    const arrayList = Array.from(nodelist);
    return arrayList.map(e => e.innerText)
  });

  let bisQ4 = await page.evaluate(() => {
    const nodelist = document.querySelectorAll(`a.q4.icontiny`);
    const arrayList = Array.from(nodelist);
    return arrayList.map(e => e.innerText)
  });

  let bisList = []
  bisList.concat(bisQ1, bisQ2, bisQ3, bisQ4)
  console.log('bislist ', bisList.concat(bisQ1, bisQ2, bisQ3, bisQ4))

  finalList['Feral Druid Tank'] = bisList.concat(bisQ1, bisQ2, bisQ3, bisQ4);
  console.log('bisQ1 ', bisQ1)
  console.log('bisQ2 ', bisQ2)
  console.log('bisQ3 ', bisQ3)
  console.log('bisQ4 ', bisQ4)

  fs.writeFileSync("feralDruidBIS.json", JSON.stringify(finalList));
  console.log('wrote file')

  browser.close();
}

wowScraper('https://classic.wowhead.com/guides/feral-druid-tank-gear-bis-classic-wow')