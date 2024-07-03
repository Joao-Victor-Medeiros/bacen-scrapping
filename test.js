const fs = require("fs");
const puppeteer = require("puppeteer");

function loopOfDay(num) {
    if (num === 31){
        return 1
    } else {
        return num + 1;
    }
}

console.log(loopOfDay(20))

async function start () {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false
    });

    const page = await browser.newPage();
    await page.goto("https://www.bcb.gov.br/acessoinformacao/agendaautoridades");


    const selectOfDay = 'body > app-root > app-root > div > div > main > dynamic-comp > div > div > bcb-agenda-autoridades > div > div.col > div.mb-4 > bcb-seletor-datas > div > div > select:nth-child(1)'
    await page.waitForSelector(selectOfDay)
    await page.click('body > app-root > app-root > div > div > main > dynamic-comp > div > div > bcb-agenda-autoridades > div > div.col > div.mb-4 > bcb-seletor-datas > div > div > select:nth-child(1)')

    const getSelectedOptionValue = (select) => {
        return select.selectedOptions[0].value;
    };

    const selectedValue = await page.$eval(selectOfDay, getSelectedOptionValue);

    console.log(`Selected option value: ${selectedValue}`);
    const parse = parseInt(selectedValue,10);
    console.log(typeof parse)

    const selectOfMonth = 'select.form-control:nth-child(2)'
    await page.waitForSelector(selectOfMonth)
    await page.click(selectOfMonth)


    const selectOfYear = 'select.form-control:nth-child(3)'
    await page.waitForSelector(selectOfYear)
    await page.click(selectOfYear)
    await selectYear(1);

    async function selectDay(qtd) {
        for(let i = 0; i < qtd; i++) {
            await page.keyboard.press('ArrowDown');
        }
        await page.keyboard.press('Enter')
    }

    async function selectMonth(qtd) {
        for (let i = 0;i < qtd; i++){
            await page.keyboard.press('ArrowUp');
        }
        await page.keyboard.press('Enter')
    }

    async function selectYear(qtd) {
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter')
    }
}

start();