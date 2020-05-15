const puppeteer = require('puppeteer');
const fs = require('fs');

const finalList = {}

async function wowArmorScraper() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // const armorTypes = ['cloth', 'leather', 'mail', 'plate']
  // const url = ['https://classic.wowhead.com/trinkets', `https://classic.wowhead.com/${armorTypes[3]}-shoulder-armor`, `https://classic.wowhead.com/shields`, 'https://classic.wowhead.com/rings', 'https://classic.wowhead.com/quiver-items', `https://classic.wowhead.com/${armorTypes[3]}-leg-armor`, `https://classic.wowhead.com/${armorTypes[3]}-head-armor`, `https://classic.wowhead.com/${armorTypes[3]}-hand-armor`, `https://classic.wowhead.com/${armorTypes[3]}-foot-armor`, 'https://classic.wowhead.com/cloaks', `https://classic.wowhead.com/${armorTypes[3]}-chest-armor`, `https://classic.wowhead.com/${armorTypes[3]}-bracers`, `https://classic.wowhead.com/${armorTypes[3]}-belts`, 'https://classic.wowhead.com/amulets']
  // const nonTypedUrls = ['https://classic.wowhead.com/trinkets', `https://classic.wowhead.com/shields`, 'https://classic.wowhead.com/rings', 'https://classic.wowhead.com/quiver-items', 'https://classic.wowhead.com/cloaks', 'https://classic.wowhead.com/amulets']
  // const armorUrls = [ `https://classic.wowhead.com/${armorTypes[j]}-shoulder-armor`, `https://classic.wowhead.com/${armorTypes[j]}-leg-armor`, `https://classic.wowhead.com/${armorTypes[j]}-head-armor`, `https://classic.wowhead.com/${armorTypes[j]}-hand-armor`, `https://classic.wowhead.com/${armorTypes[j]}-hand-armor`, `https://classic.wowhead.com/${armorTypes[j]}-foot-armor`, `https://classic.wowhead.com/${armorTypes[j]}-chest-armor`, `https://classic.wowhead.com/${armorTypes[j]}-bracers`, ]
  

  const nonTypedUrls = ['https://classic.wowhead.com/trinkets', `https://classic.wowhead.com/shields`, 'https://classic.wowhead.com/rings', 'https://classic.wowhead.com/quiver-items', 'https://classic.wowhead.com/cloaks', 'https://classic.wowhead.com/amulets']
  
  for(let i = 0; i < nonTypedUrls.length; i++){
    await page.goto(nonTypedUrls[i]);

    const h1 = await page.evaluate(() => document.querySelector("h1").textContent)

    let items = await page.evaluate(() => {
      const nodelist = document.querySelectorAll("a.listview-cleartext");
      const arrayList = Array.from(nodelist);
      return arrayList.map(e => e.innerText)
    });

    finalList[h1] = items;

    console.log('h1 ', h1);
    console.log('items non-typed', items);
    fs.writeFileSync("armor.json", JSON.stringify(finalList));
  }


  
  const armorTypes = ['cloth', 'leather', 'mail', 'plate']
  
  for(let j = 0; j < armorTypes.length; j++){
    // const url = ['https://classic.wowhead.com/trinkets', `https://classic.wowhead.com/${armorTypes[j]}-shoulder-armor`, `https://classic.wowhead.com/shields`, 'https://classic.wowhead.com/rings', 'https://classic.wowhead.com/quiver-items', `https://classic.wowhead.com/${armorTypes[j]}-leg-armor`, `https://classic.wowhead.com/${armorTypes[j]}-head-armor`, `https://classic.wowhead.com/${armorTypes[j]}-hand-armor`, `https://classic.wowhead.com/${armorTypes[j]}-foot-armor`, 'https://classic.wowhead.com/cloaks', `https://classic.wowhead.com/${armorTypes[j]}-chest-armor`, `https://classic.wowhead.com/${armorTypes[j]}-bracers`, `https://classic.wowhead.com/${armorTypes[j]}-belts`, 'https://classic.wowhead.com/amulets']
    const armorUrls = [ `https://classic.wowhead.com/${armorTypes[j]}-shoulder-armor`, `https://classic.wowhead.com/${armorTypes[j]}-leg-armor`, `https://classic.wowhead.com/${armorTypes[j]}-head-armor`, `https://classic.wowhead.com/${armorTypes[j]}-hand-armor`, `https://classic.wowhead.com/${armorTypes[j]}-hand-armor`, `https://classic.wowhead.com/${armorTypes[j]}-foot-armor`, `https://classic.wowhead.com/${armorTypes[j]}-chest-armor`, `https://classic.wowhead.com/${armorTypes[j]}-bracers`, ]
 
    for (let i = 0; i < armorUrls.length; i++){
      await page.goto(armorUrls[i]);
  
      const h1 = await page.evaluate(() => document.querySelector("h1").textContent)
  
      let items = await page.evaluate(() => {
        const nodelist = document.querySelectorAll("a.listview-cleartext");
        const arrayList = Array.from(nodelist);
        return arrayList.map(e => e.innerText)
      });

      finalList[h1] = items;
    
      console.log('h1 ', h1)
      console.log('items armor', items);
      fs.writeFileSync("armor.json", JSON.stringify(finalList));
    }
  }

  console.log('finalList ', finalList);
  browser.close();
}

wowArmorScraper()