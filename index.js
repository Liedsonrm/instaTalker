const puppeteer = require('puppeteer');
const site = "https://www.instagram.com"
require("dotenv").config()
var msg = 'Desculpa por ficar mandando "Boa noite!"'

async function roboTalker(site) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(site);

  console.debug("-> Browser openned")

  //Ading the username
  await page.waitForSelector('._2hvTZ.pexuQ.zyHYP')
  await page.type('._2hvTZ.pexuQ.zyHYP', process.env.APP_USERNAME)

  //Adding the password
  await page.waitForSelector('[name="password"]')
  await page.type('[name="password"]', process.env.APP_PASSWORD)

  await page.click(".sqdOP.L3NKy.y3zKF")
  console.debug("-> successfully logged")
  
    //Entrando no direct
  await page.waitForSelector('[href="/direct/inbox/"]')
  await page.click('[href="/direct/inbox/"]')

  //Recusando a notificação
  await page.waitForSelector(".aOOlW.HoLwm")
  await page.click(".aOOlW.HoLwm")

  //Esperando o carregamento das mensagens
  await page.waitForSelector(".DPiy6.Igw0E.IwRSH.eGOV_._4EzTm")
  
  for(let i = 1; i < 3; i++){
    await sleep(500)
    await sendMessage(page, i)
  }
  
  await page.close()

  return

};

async function sendMessage(page, i){
    
        await page.click(`.DPiy6.Igw0E.IwRSH.eGOV_._4EzTm:nth-child(${String(i)})`)
    
        await page.waitForSelector('[placeholder="Mensagem..."]')
        await page.type('[placeholder="Mensagem..."]', msg)
    
        await page.waitForSelector('div.Igw0E.IwRSH.eGOV_._4EzTm.JI_ht:last-child')
        await page.keyboard.press("Enter")
        
    
        await page.screenshot({ path: `conversa${String(i)}.png`})
    
        console.log("Mensage send successfully")
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
} 

roboTalker(site, msg)