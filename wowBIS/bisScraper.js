const puppeteer = require('puppeteer');
const fs = require('fs');

let finalList = {}

async function wowScraper() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const urls = ['https://classic.wowhead.com/guides/feral-druid-tank-gear-bis-classic-wow', "https://classic.wowhead.com/guides/lights-bulwark-protection-paladin-tanking#pre-raid-best-in-slot", "https://classic.wowhead.com/guides/warrior-tank-gear-bis-classic-wow", "https://classic.wowhead.com/guides/druid-healing-gear-bis-classic-wow", "https://classic.wowhead.com/guides/paladin-healing-gear-bis-classic-wow", "https://classic.wowhead.com/guides/priest-healing-gear-bis-classic-wow", "https://classic.wowhead.com/guides/shaman-healing-gear-bis-classic-wow", "https://classic.wowhead.com/guides/balance-druid-dps-gear-bis-classic-wow", "https://classic.wowhead.com/guides/feral-druid-dps-gear-bis-classic-wow", "https://classic.wowhead.com/guides/hunter-dps-gear-bis-classic-wow", "https://classic.wowhead.com/guides/mage-dps-gear-bis-classic-wow", "https://classic.wowhead.com/guides/paladin-dps-gear-bis-classic-wow", "https://classic.wowhead.com/guides/shadow-priest-dps-gear-bis-classic-wow", "https://classic.wowhead.com/guides/rogue-dps-gear-bis-classic-wow", "https://classic.wowhead.com/guides/elemental-shaman-dps-gear-bis-classic-wow", "https://classic.wowhead.com/guides/enhancement-shaman-dps-gear-bis-classic-wow", "https://classic.wowhead.com/guides/warlock-dps-gear-bis-classic-wow", "https://classic.wowhead.com/guides/fury-warrior-dps-gear-bis-classic-wow"]
  for (let i = 0; i < urls.length; i++){
    await page.goto(urls[i]);

    const h1 = await page.evaluate(() => document.querySelector("h1").textContent)
  
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
  
    finalList[h1] = bisList.concat(bisQ1, bisQ2, bisQ3, bisQ4);
    console.log('bisQ1 ', bisQ1)
    console.log('bisQ2 ', bisQ2)
    console.log('bisQ3 ', bisQ3)
    console.log('bisQ4 ', bisQ4)
  
    fs.writeFileSync(`${h1}.json`, JSON.stringify(finalList));
    console.log('wrote file')
    finalList = {}
  }
  
 

  browser.close();
}

wowScraper()