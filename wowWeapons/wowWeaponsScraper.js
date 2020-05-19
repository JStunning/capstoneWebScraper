const puppeteer = require('puppeteer');
// const fs = require('fs');
const express = require('express')
const bodyParser = require("body-parser")
const app = express();
app.use(bodyParser.json());
const path = require('path')
const fetch = require("node-fetch");

const db = require("../db");
const collection = "items"

app.get('/getItems', (req,res) => {
  db.getDB().collection(collection).find({}).toArray((err, documents) => {
    if(err){
      console.log(err);
    } else {
      console.log
      console.log("documents ",documents)
      res.json(documents);
    }
  })
})

db.connect((err) => {
  if(err){
    console.log('unable to connect to database');
    process.exit(1);
  } else {
    app.listen(3000, ()=> {
      console.log('connected to database, app listening on port 3000');
    });
  }
})

let finalList = {}

async function wowWeaponsScraper() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  const url = ['https://classic.wowhead.com/wands', 'https://classic.wowhead.com/staves', 'https://classic.wowhead.com/polearms', 'https://classic.wowhead.com/guns', 'https://classic.wowhead.com/fist-weapons', 'https://classic.wowhead.com/daggers', 'https://classic.wowhead.com/crossbows', 'https://classic.wowhead.com/bows', 'https://classic.wowhead.com/two-handed-swords', 'https://classic.wowhead.com/one-handed-swords', 'https://classic.wowhead.com/two-handed-maces', 'https://classic.wowhead.com/one-handed-maces', 'https://classic.wowhead.com/two-handed-axes', 'https://classic.wowhead.com/one-handed-axes']
  for (let i = 0; i < url.length; i++){
    await page.goto(url[i]);

    const h1 = await page.evaluate(() => document.querySelector("h1").textContent)

    let items = await page.evaluate(() => {
      const nodelist = document.querySelectorAll("a.listview-cleartext");
      const arrayList = Array.from(nodelist);
      return arrayList.map(e => e.innerText)
    });
  
    finalList[h1] = items;
    console.log('h1 ', h1)
    console.log('items', items);
  
    // fs.writeFileSync(`${h1}.json`, JSON.stringify(finalList));
    // console.log('wrote file')
    const setItemsInDB = () => {
      app.post('/', (res) => {
        const userInput = JSON.stringify({h1 : items});
        db.getDB().collection(collection).insertOne(userInput, (err, result) => {
          if(err){
            console.log(err);
          } else {
            res.json({result : result, document : result.ops[0]})
          }
        })
      })
    }

    setItemsInDB();

    finalList = {}
  }

  browser.close();
}

wowWeaponsScraper()