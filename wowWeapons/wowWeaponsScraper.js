const puppeteer = require('puppeteer');
const fs = require('fs');

const finalList = {}

async function wowWeaponsScraper() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  const url = ['https://classic.wowhead.com/wands', 'https://classic.wowhead.com/staves', 'https://classic.wowhead.com/polearms', 'https://classic.wowhead.com/guns', 'https://classic.wowhead.com/fist-weapons', 'https://classic.wowhead.com/daggers', 'https://classic.wowhead.com/crossbows', 'https://classic.wowhead.com/bows', 'https://classic.wowhead.com/two-handed-swords', 'https://classic.wowhead.com/one-handed-swords', 'https://classic.wowhead.com/two-handed-maces', 'https://classic.wowhead.com/one-handed-maces', 'https://classic.wowhead.com/two-handed-axes', 'https://classic.wowhead.com/one-handed-axes']
  for (let i = 0; i < url.length; i++){
    await page.goto(url[i]);

    const h1 = await page.evaluate(() => document.querySelector("h1").textContent)

    let out = await page.evaluate(() => {
      const nodelist = document.querySelectorAll("a.listview-cleartext");
      const arrayList = Array.from(nodelist);
      return arrayList.map(e => e.innerText)
    });
  
    finalList[h1] = out;
    console.log('h1 ', h1)
    console.log('out', out);
  
    fs.writeFileSync("wowWeapons.json", JSON.stringify(finalList));
    console.log('wrote file')
  }

  browser.close();
}

wowWeaponsScraper()