const puppeteer = require('puppeteer');

async function wowScraper() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url = ['https://classic.wowhead.com/wands', 'https://classic.wowhead.com/staves', 'https://classic.wowhead.com/polearms']
  for (let i = 0; i < url.length; i++){
    await page.goto(url[i]);

    const h1 = await page.evaluate(() => document.querySelector("h1").textContent)

    let out = await page.evaluate(() => {
      const nodelist = document.querySelectorAll("a.listview-cleartext");
      const arrayList = Array.from(nodelist);
      return arrayList.map(e => e.innerText)
    });
  
    // finalOut[h1] = out;
    console.log('h1 ', h1)
    console.log('out', out);
  }


  // const h1 = await page.evaluate(() => document.querySelector("h1").textContent)

  // let out = await page.evaluate(() => {
  //   const nodelist = document.querySelectorAll("a.listview-cleartext");
  //   const arrayList = Array.from(nodelist);
  //   return arrayList.map(e => e.innerText)
  // });

  // // finalOut[h1] = out;
  // console.log('h1 ', h1)
  // console.log('out', out);

  // fs.writeFileSync("test.json", JSON.stringify(finalOut));
  // console.log('wrote file')

  browser.close();
}

wowScraper()