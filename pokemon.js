const puppeteer = require('puppeteer');

async function pokemonScraper(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const [imgEl] = await page.$x('//*[@id="mw-content-text"]/table[2]/tbody/tr[1]/td/table/tbody/tr[2]/td/table/tbody/tr[1]/td/a/img')
  const imgProp = await imgEl.getProperty('src')
  const image = await imgProp.jsonValue();

  const [nameEl] = await page.$x('//*[@id="mw-content-text"]/table[2]/tbody/tr[1]/td/table/tbody/tr[1]/td/table/tbody/tr/td[1]/big/big/b')
  const textProp = await nameEl.getProperty('textContent')
  const name = await textProp.jsonValue();

  const [numEl] = await page.$x('//*[@id="mw-content-text"]/table[2]/tbody/tr[1]/td/table/tbody/tr[1]/th/big/big/a/span')
  const numProp = await numEl.getProperty('textContent')
  const num = await numProp.jsonValue();

  const [type1El] = await page.$x('//*[@id="mw-content-text"]/table[2]/tbody/tr[2]/td/table/tbody/tr/td[1]/table/tbody/tr/td[1]/a/span/b')
  const type1Prop = await type1El.getProperty('textContent')
  const type1 = await type1Prop.jsonValue();

  const [type2El] = await page.$x('//*[@id="mw-content-text"]/table[2]/tbody/tr[2]/td/table/tbody/tr/td[1]/table/tbody/tr/td[2]/a/span/b')
  const type2Prop = await type2El.getProperty('textContent')
  const type2 = await type2Prop.jsonValue();

  console.log({image, name, num, type1, type2})

  browser.close();
}

pokemonScraper('https://bulbapedia.bulbagarden.net/wiki/Bulbasaur_(Pok%C3%A9mon)')