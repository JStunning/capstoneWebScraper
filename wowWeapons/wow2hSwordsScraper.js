const puppeteer = require('puppeteer');
const fs = require('fs');

const finalOut = {}

async function wow2hSwordsScraper(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const h1 = await page.evaluate(() => document.querySelector("h1").textContent)

  let out = await page.evaluate(() => {
    const nodelist = document.querySelectorAll("a.listview-cleartext");
    const arrayList = Array.from(nodelist);
    return arrayList.map(e => e.innerText)
  });

  finalOut[h1] = out;
  console.log('h1 ', h1)
  console.log('out', out);

  fs.writeFileSync("test.json", JSON.stringify(finalOut));
  console.log('wrote file')

  browser.close();
}

wow2hSwordsScraper('https://classic.wowhead.com/two-handed-swords')

  // const [imgEl] = await page.$x('//*[@id="ic16908"]/div/ins')
  // const imgProp = await imgEl.getProperty('style')
  // const image = await imgProp.jsonValue();

  // const elms = await page.querySelectorAll("tbody.clickable > tr > td > div.iconmedium ins");
  // let theLinks = Array.from(elms).map(e => {
  //   console.log(e.getAttribute("style").split("url(")[1].split("")[0]);
  // })

  // Array.from(document.querySelectorAll("a.listview-cleartext").textContent)
  // Array.from(document.querySelectorAll("a.listview-cleartext").innerText)
  // Array.from(document.querySelectorAll("a.listview-cleartext"))
  // Array.from(document.querySelectorAll("a.q4"))
  // Array.from(document.querySelectorAll("a.q4").innerText)
  // Array.from(document.querySelectorAll("a.q4").textContent)
  // Array.from(document.querySelectorAll("a.q4.listview-cleartext"))
  // Array.from(document.querySelectorAll("a.q4.listview-cleartext").innerText)
  // Array.from(document.querySelectorAll("a.q4.listview-cleartext").textContent)

  // console.log('array', array);

  // console.log("h1 ", h1);
  // console.log("items", items)
  
  // for(i = 0; i < items.length; i++){
  //   console.log("items", items[i])
  // }